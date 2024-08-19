import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentDetails.css'; // Import your CSS file

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);
    const [inventoryId, setInventoryId] = useState(''); // Corrected variable name
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch payments from the backend
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/payment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    // Handle form submission for adding new payment
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://127.0.0.1:5555/payment', {
                inventory_id: inventoryId, // Corrected variable name
                amount: parseFloat(amount),
                payment_date: paymentDate,
            });
            setSuccess(response.data.message);
            setPayments([...payments, {
                inventory_id: inventoryId, // Corrected variable name
                amount: parseFloat(amount),
                payment_date: paymentDate,
            }]);
            setInventoryId('');
            setAmount('');
            setPaymentDate('');
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="payment-details-container">
            <h2>Payment Details</h2>
            <p>Manage your payment methods and details here.</p>

            {/* Display success or error messages */}
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="inventoryId">Inventory ID:</label>
                    <input
                        type="text"
                        id="inventoryId"
                        value={inventoryId}
                        onChange={(e) => setInventoryId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentDate">Payment Date:</label>
                    <input
                        type="date"
                        id="paymentDate"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Payment</button>
            </form>

            {/* Display list of payments */}
            <div className="payments-list">
                <h3>Existing Payments</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Inventory ID</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.inventory_id}</td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentDetails;