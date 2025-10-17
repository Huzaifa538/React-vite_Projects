// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx'; // ya jahan bhi ho
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster /> {/* ✅ StrictMode ke ANDAR */}
    </ThemeProvider>
  </React.StrictMode>
);