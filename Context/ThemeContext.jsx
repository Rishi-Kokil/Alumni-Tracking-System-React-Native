// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Define initial themes
const lightTheme = {
  background: '#FFFFFF',
  text: '#333333',
  primaryButton: '#0A66C2',
  buttonText: '#FFFFFF',
  profileComponent: '#F2F2F2',
  postBackground: '#FFFFFF',
  icon: '#666666',
  highlightedText: '#0A66C2',
  blue : "#0a66c2",
};

const darkTheme = {
  background: '#333333',
  text: '#FFFFFF',
  primaryButton: '#0A66C2',
  buttonText: '#FFFFFF',
  profileComponent: '#666666',
  postBackground: '#444444',
  icon: '#CCCCCC',
  highlightedText: '#0A66C2',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
