const express = require("express");
const router = express.Router();
const multer = require("multer");
const azureStorage = require("@azure/storage-blob");
const path = require("path");
const File = require("./../fileModel");
const fs = require("fs");
require("dotenv").config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const sharedKeyCredential = new azureStorage.StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new azureStorage.BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function uploadFiles(req, res) {
  try {
    console.log("Starting cleanup of old files");
    await cleanupOldFiles();
    console.log("Finished cleanup of old files");

    const uploadedFiles = req.files;
    console.log("Uploaded files:", uploadedFiles);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    for (const file of uploadedFiles) {
      const code = req.body.code;
      console.log("Processing file:", file.originalname, "with code:", code);

      // Check if code already exists in the database
      const existingFile = await File.findOne({ code });
      if (existingFile) {
        console.log("Duplicate key error");
        return res.status(409).json({ error: "Duplicate code" });
      }

      const blockBlobClient = containerClient.getBlockBlobClient(
        file.originalname
      );
      console.log("BlockBlobClient created for file:", file.originalname);

      const uploadBlobResponse = await blockBlobClient.upload(
        file.buffer,
        file.buffer.length
      );
      console.log(
        `Uploaded block blob ${file.originalname} successfully`,
        uploadBlobResponse.requestId
      );

      // Store metadata in your database
      const updatedDocument = await File.create({
        code: code,
        filename: file.originalname,
        uploadTime: Date.now(),
      });
      console.log("Updated document:", updatedDocument);
    }

    console.log("All files processed successfully");
    res.status(200).json({ status: "ok" });
  } catch (err) {
    if (err.message === "Duplicate code") {
      console.log("Duplicate code error caught");
      return res.status(409).json({ error: "Duplicate code" });
    } else {
      // Handle other errors
      console.error("Error during file upload process:", err);
      return res.status(500).json({ error: "Failed to update filename" });
    }
  }
}

async function cleanupOldFiles() {
  try {
    console.log("Starting cleanup process");

    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;

    // Find files older than 30 minutes in the database
    const oldFiles = await File.find({ uploadTime: { $lt: thirtyMinutesAgo } });
    console.log("Found old files to delete:", oldFiles);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    for (const file of oldFiles) {
      const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

      try {
        // Delete the blob from Azure
        const deleteResponse = await blockBlobClient.delete();
        console.log(`Deleted old blob: ${file.filename}`);

        // Delete corresponding database entry
        await File.deleteOne({ _id: file._id }); // Use _id for accurate deletion

        console.log("Deleted old file and database entry:", file.filename);
      } catch (err) {
        if (err.statusCode === 404) {
          // Consider this situation, maybe the file already got deleted?
          console.log(`Blob ${file.filename} may not exist.`);
        } else {
          console.error("Error deleting old file or database entry:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
}

router.post("/", upload.array("files"), uploadFiles);

module.exports = router;
