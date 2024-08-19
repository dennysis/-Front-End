import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchProducts, fetchCategories } from '../api';
import ProductDetails from './ProductDetail';
import './Product.css';
import { useNavigate } from 'react-router-dom';

const placeholderImage = 'https://via.placeholder.com/150';

const Product = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchProducts();
                setProducts(productsResponse.data);

                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = async (e) => {
        setSelectedCategory(e.target.value);
        try {
            const response = await axios.get(`http://127.0.0.1:5555/categories/${e.target.value}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        navigate(`/products/${product.id}`);
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-container">
            <h2>Products</h2>
            <div className="filter-section">
                <label htmlFor="category">Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.sp}</p>
                            <p>Category ID: {product.category_id}</p>
                            <img 
                                src={product.image || placeholderImage} 
                                alt={product.name} 
                                className="product-image"
                                onError={(e) => {
                                    console.error(`Error loading image for product ${product.name}`);
                                    e.target.src = placeholderImage;
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {selectedProduct && (
                <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
            )}
        </div>
    );
};

export default Product;
