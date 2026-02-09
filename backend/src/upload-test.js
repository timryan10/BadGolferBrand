import fetch from "node-fetch";
import fs from "fs";
import path from "path";

async function testUpload() {
  const filePath = path.join(process.cwd(), "src", "test-upload.txt");
  const file = fs.readFileSync(filePath);
  const filename = "test-upload.txt";

  // Step 1: Get pre-signed URL from your backend
  const res = await fetch("http://localhost:3000/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, contentType: "text/plain" })
  });

  if (!res.ok) {
    console.error("Failed to get pre-signed URL", await res.text());
    return;
  }

  const { uploadUrl, key } = await res.json();
  console.log("Pre-signed URL:", uploadUrl);
  console.log("S3 Key:", key);

  // Step 2: Upload file directly to S3
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: file
  });

  if (uploadRes.ok) {
    console.log("Upload successful!");
    console.log(`File is at s3://${key}`);
  } else {
    console.error("Upload failed", uploadRes.status, await uploadRes.text());
  }
}

testUpload();
