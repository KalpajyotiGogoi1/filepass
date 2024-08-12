const express = require("express");
const azureStorage = require("@azure/storage-blob");
const router = express.Router();
const File = require("./../fileModel");

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

router.get("/download_file/:code", async (req, res) => {
  // Notice the parameter is 'code'
  try {
    const code = req.params.code;

    const file = await File.findOne({ code });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filename = file.filename;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    // Check if the blob exists (optional)
    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
      return res
        .status(404)
        .json({ message: "File not found in Azure Blob storage" });
    }

    // Initiate download
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    // Stream the Azure Blob download to the response
    downloadBlockBlobResponse.readableStreamBody.pipe(res);
  } catch (err) {
    console.error("Error downloading from Azure Blob Storage:", err);
    res.status(500).json({ message: "Error downloading file" });
  }
});

module.exports = router;
