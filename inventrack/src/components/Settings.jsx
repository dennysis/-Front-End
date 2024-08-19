import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signup } from '../api';
import './settings.css';
import Appearance from './Appearance';
import PaymentDetails from './PaymentDetails';
import ResetSettings from './ResetSettings';
import AboutInventrack from './AboutInventrack';
import axios from 'axios'

const Settings = () => {
    const [activeSection, setActiveSection] = useState('login');
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isLogin) {
                const response = await axios.post(
                    'http://localhost:5555/login',
                    { email:formData.email, password :formData.password},
                    {
                      withCredentials: true, // This ensures cookies are sent and stored
                    }
                  );
                
                setSuccess(response.data.message);
            } else {
                const response = await signup(formData);
                setSuccess(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(''), 5000);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'login':
                return (
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
                            {success && <div className="success-message">{success}</div>}
                        </form>
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                        </button>
                    </div>
                );
            case 'appearance':
                return <Appearance />;
            case 'payment':
                return <PaymentDetails />;
            case 'reset':
                return <ResetSettings />;
            case 'about':
                return <AboutInventrack />;
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-buttons">
                <button onClick={() => setActiveSection('login')}>
                    <i className="fas fa-user-circle"></i> Login/Sign Up
                </button>
                <button onClick={() => setActiveSection('appearance')}>
                    <i className="fas fa-paint-brush"></i> Appearance
                </button>
                <button onClick={() => setActiveSection('payment')}>
                    <i className="fas fa-credit-card"></i> Payment Details
                </button>
                {/* <button onClick={() => setActiveSection('reset')}>
                    <i className="fas fa-undo"></i> Reset Settings
                </button> */}
                <button onClick={() => setActiveSection('about')}>
                    <i className="fas fa-info-circle"></i> About Inventrack
                </button>
                <button onClick={() => navigate('/admin/login')}>
                    <i className="fas fa-tachometer-alt"></i> Admin Dashboard
                </button>
                <button onClick={() => navigate('/clark-products')}>
                    <i className="fas fa-home"></i> Clark
                </button>
            </div>
            <div className="settings-content">
                {renderSection()}
            </div>
        </div>
    );
};

export default Settings;
