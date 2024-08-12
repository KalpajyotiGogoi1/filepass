const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Configure CORS to allow all origins (You can specify allowed origins if needed)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Import routes
const upRoutes = require("./routes/upRoutes");
const downRoutes = require("./routes/downRoutes");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/upload_files", upRoutes);
app.use("/download_file", downRoutes);

module.exports = app;
