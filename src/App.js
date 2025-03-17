import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an X-ray image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://953c-178-86-45-87.ngrok-free.app", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image");
      }

      const data = await response.json();
      setResult(data.detections);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to analyze the image. Please try again.");
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <nav className="navbar">
        <h1 className="logo">DentalAI</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </nav>

      <header className="header">
        <h2>Welcome to DentalAI - AI Teeth Analysis</h2>
        <p>Upload your dental X-ray image and let AI analyze it.</p>
      </header>

      <section className="upload-section">
        <label className="upload-label">Upload Your X-ray</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="upload-input" />
        <button className="process-btn" onClick={handleUpload}>🔍 Process</button>
      </section>

      <section className="results-section">
        <h3>Analysis Results</h3>
        <div className="image-placeholder">
          {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : "Your analyzed image will appear here."}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 DentalAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;