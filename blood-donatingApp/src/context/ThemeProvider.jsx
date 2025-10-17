// src/components/ThemeProvider.jsx

import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // ✅ Explicitly use ThemeContext in JSX
  const ThemeProviderComponent = ThemeContext.Provider;

  return (
    <ThemeProviderComponent value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeProviderComponent>
  );
};