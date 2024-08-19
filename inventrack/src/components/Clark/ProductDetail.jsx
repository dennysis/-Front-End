// src/components/Clark/ProductDetail.jsx

import React from 'react';

const ProductDetail = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <p>Category ID: {product.category_id}</p>
            <p>Buying Price: {product.bp}</p>
            <p>Selling Price: {product.sp}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ProductDetail;
