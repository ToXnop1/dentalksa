import React, { useState } from 'react';
import './App.css';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className="App">
      <h1>Welcome to DentalKSA</h1>
      <label>
        Dark Mode
        <Toggle
          defaultChecked={darkMode}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  );
}

export default App;
