import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css'; // Assuming you have a CSS file for styling

const Error404 = () => {
    return (
        <div className="error-container">
            <h1>404</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="home-link">Go to Home</Link>
        </div>
    );
};

export default Error404;
