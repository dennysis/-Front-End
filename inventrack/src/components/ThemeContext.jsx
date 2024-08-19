// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const ThemeContext = createContext();

// Create Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Default theme is 'light'
    const [fontSize, setFontSize] = useState('medium'); // Default font size

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const changeFontSize = (size) => {
        setFontSize(size);
    };

    return (
        <ThemeContext.Provider value={{ theme, fontSize, toggleTheme, changeFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
