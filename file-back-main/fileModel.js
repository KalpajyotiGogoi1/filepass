const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date, 
    default: Date.now, 
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
