import express from "express";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID?.slice(-4)); // show only last 4
console.log("AWS_REGION:", process.env.AWS_REGION);

const s3 = new S3Client({ region: process.env.AWS_REGION });

const BUCKET_NAME = "badgolferbrand";

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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
