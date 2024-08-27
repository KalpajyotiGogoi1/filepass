import Header from "./../components/Header";
import React, { useState } from "react";

function Download() {
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);

  const downUrl = `http://localhost:8080/download_file/${code}`;

  const handleDownload = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const response = await fetch(downUrl);
      if (response.ok) {
        // Trigger download by creating a hidden link (more reliable than window.location.href)
        const downloadLink = document.createElement("a");
        downloadLink.href = downUrl;
        downloadLink.setAttribute("download", ""); // Customize filename if needed
        downloadLink.style.display = "none"; // Keep the link hidden
        document.body.appendChild(downloadLink); // Add to DOM
        downloadLink.click(); // Trigger the download
        downloadLink.remove(); // Clean up the temporary link element
        setSuccess(true); // Update state to show success message
        setCode("");
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("File Does not exist. Please recheck your code.");
    }
  };

  return (
    <div>
      <Header />
      <h3 className="text-center font-light">
        Enter the unique code set by the sender. Click recive.
      </h3>

      {/* Conditionally display success or empty div */}
      <div className="text-center">
        {success ? (
          <h2 className="text-green-500 mt-4">
            File downloaded successfully!!
          </h2>
        ) : (
          <div style={{ height: "20px" }}></div> // Maintain layout spacing even when nothing is displayed
        )}
      </div>
      <div className="mt-[100px]">
        <form>
          <div
            style={{ marginTop: 10 }}
            className="flex flex-col items-center gap-3"
          >
            <input
              type="text"
              placeholder="Enter file code"
              onChange={(e) => setCode(e.target.value)}
              className=" border border-black rounded-xl p-2 w-64 style={{ borderColor: '#000000' }} rounded-lg "
              value={code}
            />
            <button
              onClick={(e) => handleDownload(e)}
              className="bg-filepass-blue text-white py-2 px-4 rounded-xl border-none cursor-pointer w-64"
            >
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Download;
