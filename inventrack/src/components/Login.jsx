import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Navigate} from 'react-router-dom';

const Login = ({setIsAuthenticated}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let response;

      if (isLogin) {
        response = await axios.post(
          'http://localhost:5555/login',
          { email: formData.email, password: formData.password },
          {
            withCredentials: true, // Ensures cookies are sent and stored
          }
        );
        

      } else {
        response = await axios.post(
          'http://localhost:5555/signup',
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          {
            withCredentials: true,
          }
        );
      }

      // Handle success
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      // Handle error
      setSuccess('');
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success==="Login successful"?<>
          <Navigate to={'/'}/>
          {setIsAuthenticated(true)}
          </>:<></>}</div>}
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}

        </button>
      </div>
    </div>
  );
};

export default Login;
