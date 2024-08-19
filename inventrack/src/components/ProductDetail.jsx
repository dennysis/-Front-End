import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // Importing CSS file for styling
import { getProduct } from '../api';

const ProductDetail = ({ addToCart, isAddedToCart }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State to track quantity
    const [showNotification, setShowNotification] = useState(false); // State to show notification
    const [error, setError] = useState(''); // State to handle error
    const { productId } = useParams(); // Destructure id from useParams
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
            }
        };

        fetchData();
    }, [productId]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        setShowNotification(true); // Show notification
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
    };

    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleClose = () => {
        navigate('/products'); // Navigate to products page
    };

    if (error) {
        return <div className="error-message">{error}</div>; // Show error message if there is an error
    }

    if (!product) {
        return <div className="loading-message">Loading...</div>; // Show loading state
    }

    return (
        <div className='product-detail-container'>
        <div className="product-details">
            <button className="close-details" onClick={handleClose} aria-label="Close">X</button>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>Price: ${product.sp.toFixed(2)}</p>
            <p>Category ID: {product.category_id}</p>
            <p>Buying Price: ${product.bp.toFixed(2)}</p>
            <div className="quantity-controls">
                <button onClick={handleDecreaseQuantity} aria-label="Decrease quantity">-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity} aria-label="Increase quantity">+</button>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn" aria-label="Add to cart">Add to Cart</button>
            {showNotification && <p className="added-to-cart-message">This product has been added to your cart.</p>}
        </div></div>
    );
};

export default ProductDetail;
