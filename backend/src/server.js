import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID?.slice(-4)); // show only last 4
console.log("AWS_REGION:", process.env.AWS_REGION);

const s3 = new S3Client({ region: process.env.AWS_REGION });

const BUCKET_NAME = "badgolferbrand";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadedImagesPath = path.join(__dirname, "..", "uploaded-images.json");

function shouldIncludeProduct(filename) {
  return !/model|group|logo/i.test(filename);
}

function getCategory(filename) {
  if (/hat/i.test(filename)) return "hats";
  if (/hoodie|longsleeve/i.test(filename)) return "hoodies";
  if (/^mens_/i.test(filename)) return "mens";
  if (/^womens_/i.test(filename)) return "womens";
  return "other";
}

function formatName(filename) {
  let base = filename.replace(/\.[^/.]+$/, "");
  base = base.replace(/^mens_/i, "").replace(/^womens_/i, "");
  base = base
    .replace(/Lightblue/i, "Light Blue")
    .replace(/Oldschool/i, "Old School")
    .replace(/Palmtrees/i, "Palm Trees")
    .replace(/Stripedblue/i, "Striped Blue")
    .replace(/Wavyblue/i, "Wavy Blue")
    .replace(/Wavygreen/i, "Wavy Green")
    .replace(/Greenspots/i, "Green Spots");

  const words = base.split(/[_\s]+/).filter(Boolean);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateObjectKey(originalName) {
  const ext = originalName.split(".").pop();
  const id = crypto.randomUUID();
  return `products/${id}.${ext}`;
}

app.post("/api/upload-url", async (req, res) => {
  try {
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res.status(400).json({ error: "filename and contentType required" });
    }

    const key = generateObjectKey(filename);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 // seconds
    });

    res.json({
      uploadUrl,
      key
    });
  } catch (err) {
    console.error("Error generating pre-signed URL:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    if (!fs.existsSync(uploadedImagesPath)) {
      return res.status(404).json({ error: "uploaded-images.json not found" });
    }

    const raw = fs.readFileSync(uploadedImagesPath, "utf-8");
    const images = JSON.parse(raw);

    const grouped = {
      mens: [],
      womens: [],
      hats: [],
      hoodies: []
    };

    const filtered = images.filter((img) => shouldIncludeProduct(img.filename));

    const items = await Promise.all(
      filtered.map(async (img) => {
        if (img.key) {
          const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: img.key
          });
          const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
          return { ...img, signedUrl };
        }
        return { ...img, signedUrl: img.url };
      })
    );

    items.forEach((img) => {
      const category = getCategory(img.filename);
      const item = {
        name: formatName(img.filename),
        image: img.signedUrl,
        filename: img.filename
      };

      if (category === "mens") grouped.mens.push(item);
      if (category === "womens") grouped.womens.push(item);
      if (category === "hats") grouped.hats.push(item);
      if (category === "hoodies") grouped.hoodies.push(item);
    });

    const sortByName = (a, b) => a.name.localeCompare(b.name);
    grouped.mens.sort(sortByName);
    grouped.womens.sort(sortByName);
    grouped.hats.sort(sortByName);
    grouped.hoodies.sort(sortByName);

    res.json(grouped);
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
