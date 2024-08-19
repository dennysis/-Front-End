import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, initiateMpesaPayment } from '../api'; // Ensure this path is correct
import './Cart.css';

const Cart = ({ cart, updateCart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handlePaymentMethodChange = (e) => {
        setShowPaymentForm(e.target.value === 'mpesa');
    };

    const handleCheckout = async () => {
        try {
            // Fetch user profile
            const userProfileResponse = await getUserProfile();
            const userId = userProfileResponse.data.id; // Adjust based on actual response

            // Initiate M-Pesa payment
            const response = await initiateMpesaPayment({
                phone_number: phoneNumber,
                amount: cartItems.reduce((total, item) => total + item.sp, 0),
                user_id: userId
            });

            setPaymentResponse(response.data);

            if (response.data.CheckoutRequestID) {
                navigate('/success'); // Redirect to success page
            } else {
                console.error('Failed to initiate M-Pesa payment:', response.data);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleRemoveFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item !== itemToRemove);
        setCartItems(updatedCart);
        updateCart(updatedCart);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.name}</p>
                            <p>Price: ${item.sp.toFixed(2)}</p>
                            <button onClick={() => handleRemoveFromCart(item)}>Remove from Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No items in cart.</p>
                )}
            </div>
            <div className="payment-section">
                <label htmlFor="payment-method">Payment Method:</label>
                <select id="payment-method" onChange={handlePaymentMethodChange}>
                    <option value="">Select Payment Method</option>
                    <option value="mpesa">M-Pesa</option>
                </select>
                {showPaymentForm && (
                    <div>
                        <label htmlFor="phone-number">M-Pesa Phone Number:</label>
                        <input
                            type="text"
                            id="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            placeholder="Enter your phone number"
                        />
                        <button onClick={handleCheckout}>Checkout with M-Pesa</button>
                    </div>
                )}
                {paymentResponse && (
                    <div className="payment-response">
                        <h3>Payment Response</h3>
                        <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
