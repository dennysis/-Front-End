import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = ({ onLogin, onLogout, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const response = await axios.get('/checksession');
        if (response.status === 200) {
          onLogin(); // User is logged in
        }
      } catch (error) {
        // User is not logged in or session check failed
        console.error('Session check failed:', error);
      }
    };

    checkSession();
  }, [onLogin]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.success) {
        onLogin(); // Notify parent component
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      onLogout(); // Notify parent component
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="auth-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
