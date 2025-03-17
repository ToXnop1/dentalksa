import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://7966-2001-16a4-2f1-e895-4c03-ba21-b01f-5a96.ngrok-free.app"; // رابط ngrok الخاص بك

function App() {
  // تفعيل الوضع المظلم افتراضيًا عند تحميل الصفحة
  const [darkMode, setDarkMode] = useState(() => {
    document.body.classList.add("dark-mode");
    return true;
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      document.body.classList.toggle("dark-mode", !prevMode);
      return !prevMode;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // عرض معاينة الصورة
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an X-ray image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors", // 🔥 تفعيل CORS
      });

      if (!response.ok) {
        throw new Error("Failed to process the image");
      }

      const data = await response.json();
      setResult(data.detections);

      if (data.image) {
        setProcessedImage(`data:image/jpeg;base64,${data.image}`);
      }
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
          {processedImage ? (
            <img src={processedImage} alt="Processed X-ray" className="processed-image" />
          ) : imagePreview ? (
            <img src={imagePreview} alt="X-ray Preview" className="image-preview" />
          ) : (
            "Your analyzed image will appear here."
          )}
        </div>
        {result && (
          <div className="analysis-data">
            <h4>Detection Results:</h4>
            <ul>
              {result.map((detection, index) => (
                <li key={index}>
                  Class: {detection.class}, Confidence: {detection.confidence.toFixed(2)}, 
                  Box: {detection.box.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2025 DentalAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
