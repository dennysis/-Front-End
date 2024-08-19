import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
//eslint-diable-next-line
const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:5555/checksession', { withCredentials: true });
                //eslint-diable-next-line
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                //eslint-diable-next-line
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
        //eslint-enable-next-line
    }, [isAuthenticated]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5555/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stock">In Stock</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                
                {isAuthenticated ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

