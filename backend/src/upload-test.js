import fetch from "node-fetch";
import fs from "fs";
import path from "path";

async function uploadImage(filePath, filename) {
  const file = fs.readFileSync(filePath);
  
  // Determine content type based on extension
  const ext = filename.split('.').pop().toLowerCase();
  const contentType = ext === 'png' ? 'image/png' : 
                      ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 
                      'image/png';

  // Step 1: Get pre-signed URL from backend
  const res = await fetch("http://localhost:3000/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, contentType })
  });

  if (!res.ok) {
    console.error(`❌ Failed to get URL for ${filename}:`, await res.text());
    return null;
  }

  const { uploadUrl, key } = await res.json();

  // Step 2: Upload file directly to S3
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file
  });

  if (uploadRes.ok) {
    const s3Url = `https://badgolferbrand.s3.us-east-2.amazonaws.com/${key}`;
    console.log(`✅ ${filename} → ${s3Url}`);
    return { filename, url: s3Url, key };
  } else {
    console.error(`❌ Upload failed for ${filename}:`, uploadRes.status);
    return null;
  }
}

async function uploadAllImages() {
  console.log("Starting bulk image upload...\n");
  
  // Path to your frontend images
  const imgsDir = path.join(process.cwd(), "..", "frontend", "badgolferbrand", "src", "Imgs");
  
  if (!fs.existsSync(imgsDir)) {
    console.error("❌ Images directory not found:", imgsDir);
    return;
  }

  // Get all image files
  const files = fs.readdirSync(imgsDir)
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  
  console.log(`Found ${files.length} images to upload\n`);

  const results = [];
  
  // Upload each image
  for (const file of files) {
    const filePath = path.join(imgsDir, file);
    const result = await uploadImage(filePath, file);
    if (result) {
      results.push(result);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n✅ Successfully uploaded ${results.length} of ${files.length} images`);
  
  // Save URLs to a JSON file for reference
  const outputPath = path.join(process.cwd(), "uploaded-images.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 URLs saved to: ${outputPath}`);
}

uploadAllImages();
