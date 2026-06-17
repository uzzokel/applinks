"use server";

import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

export async function uploadFileAction(formData: FormData) {
  const file = formData.get("file") as File;
  
  if (!file) {
    throw new Error("No file provided");
  }

  // 1. LOCAL DEVELOPMENT MODE BYPASS
  // If we are on your local computer, save the file locally instead of calling Vercel
  if (process.env.NODE_ENV === "development") {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a local path pointing to your project's public folder
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure the upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      
      // Save the file locally
      const uniqueName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, uniqueName);
      await fs.writeFile(filePath, buffer);

      // Return the local URL path for your preview grid
      return { url: `/uploads/${uniqueName}` };
    } catch (localError) {
      console.error("Local save failed:", localError);
      throw new Error("Failed to save asset locally");
    }
  }

  // 2. PRODUCTION MODE (When deployed live on Vercel)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const blob = await put(file.name, buffer, {
    access: "public",
    addRandomSuffix: true,
  });
  
  return { url: blob.url };
}