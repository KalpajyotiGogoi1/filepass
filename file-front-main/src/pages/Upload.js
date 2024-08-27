import Header from "./../components/Header";
import React, { useState, useRef } from "react";
import folderIcon from "./../assets/folder.png";
import Success from "./../components/Success";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [passCode, setPassCode] = useState("");
  const [response, setResponse] = useState("");

  const fileInputRef = useRef(null);
  const handleFolderClick = () => {
    fileInputRef.current.click(); // Trigger the hidden input's click
  };

  var empty = false;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if file size is greater than 1MB
    if (selectedFile.size > 20 * 1024 * 1024) {
      // 1MB = 1024 * 1024 bytes
      // File size exceeds 1MB, show error message
      setUploadStatus("File size exceeds 1MB. Please select a smaller file.");
      return;
    }
    setSelectedFile(selectedFile);
    setSelectedFileName(selectedFile.name); // Extract the filename
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (selectedFile == null || passCode === "") {
      empty = true;
      return;
    }
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("code", passCode);
    formData.append("files", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/upload_files", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      setResponse(response);

      if (response.status === 200) {
        setUploadStatus("File uploaded successfully!");
      } else if (response.status === 409) {
        setUploadStatus(
          "This code is in use, please retry with a new unique code."
        );
        setPassCode("");
      } else {
        setUploadStatus("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <h3 className="text-center font-light">
        Select file. Enter a unique code. Hit send.
      </h3>

      {response.status === 200 ? (
        <Success code={passCode} />
      ) : (
        <div className="flex items-center justify-center mt-16 flex-col">
          <div>
            <img
              src={folderIcon}
              alt="Upload Icon"
              onClick={handleFolderClick}
              className="w-36 h-36"
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p className="text-center">{selectedFileName}</p>
          </div>

          <br></br>
          <div>
            <input
              type="text"
              placeholder="Enter file code"
              onChange={(e) => setPassCode(e.target.value)}
              className="p-2 rounded-xl border border-filepass-blue w-36"
              required
              value={passCode}
            />

            <button
              onClick={(e) => handleFileUpload(e)}
              className="bg-filepass-blue text-white px-4 py-2 rounded-xl border-none cursor-pointer ml-3"
            >
              Upload
            </button>
          </div>

          <p className="text-center text-red-400">{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;
