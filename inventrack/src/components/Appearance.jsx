// src/components/Appearance.jsx
import React from 'react';
import { useTheme } from './ThemeContext';
import './Appearance.css'; // Make sure to create a CSS file for styling

const Appearance = () => {
    const { theme, fontSize, toggleTheme, changeFontSize } = useTheme();

    return (
        <div className={`appearance-container ${theme} ${fontSize}`}>
            <h2>Appearance Settings</h2>
            <p>Here you can customize the appearance of the application.</p>
            <button className="theme-toggle" onClick={toggleTheme}>
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
            <div className="font-size-controls">
                <button onClick={() => changeFontSize('small')}>
                    <i className="fas fa-text-height"></i> Small Font
                </button>
                <button onClick={() => changeFontSize('medium')}>
                    <i className="fas fa-text-width"></i> Medium Font
                </button>
                <button onClick={() => changeFontSize('large')}>
                    <i className="fas fa-text-height"></i> Large Font
                </button>
            </div>
        </div>
    );
};

export default Appearance;
