import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <nav className="navbar">
        <h1 className="logo">DentalKSA</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <header className="header">
        <h2>Welcome to DentalKSA AI Teeth Detection</h2>
        <p>Upload your dental X-ray image and let AI analyze it.</p>
      </header>

      <section className="upload-section">
        <label className="upload-label">Upload Your X-ray</label>
        <input type="file" accept="image/*" className="upload-input" />
        <button className="process-btn">🔍 Process</button>
      </section>

      <section className="results-section">
        <h3>Detection Results</h3>
        <div className="image-placeholder">Your analyzed image will appear here.</div>
      </section>

      <footer className="footer">
        <p>© 2025 DentalKSA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
