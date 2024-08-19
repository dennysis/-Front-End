import React, { useState } from 'react';
import { signup } from '../../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';  // Import the CSS file

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const response = await signup(formData);
        console.log('Admin signed up:', response.data);
        // handle successful signup
      } else {
        const response = await axios.post(
          'http://localhost:5555/login',
          { email: formData.email, password: formData.password },
          { withCredentials: true } // This ensures cookies are sent and stored
        );
        console.log('Admin logged in:', response.data);
        // handle successful login
        navigate('/admin/dashboard'); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} failed:`, error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
