import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api';  // Import the API functions
import { fetchCategories } from '../../api';
import ProductDetails from './ProductDetail';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const placeholderImage = 'https://via.placeholder.com/150';

const ClarkProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category_id: '',
        bp: '',
        sp: '',
        image: '',
        image_file: null
    });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await getProducts();
                setProducts(productsResponse.data);

                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = async (e) => {
        const selectedCategoryId = e.target.value;
        console.log('Selected Category ID:', selectedCategoryId); // Debugging
    
        setSelectedCategory(selectedCategoryId);
        try {
            const response = await axios.get(`http://127.0.0.1:5555/categories/${selectedCategoryId}/products`);
            console.log('Fetched Products:', response.data); // Debugging
    
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewProduct(prevState => ({
            ...prevState,
            image_file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = newProduct.image;

        if (newProduct.image_file) {
            const formData = new FormData();
            formData.append('file', newProduct.image_file);
            try {
                const imageResponse = await axios.post('http://127.0.0.1:5555/upload_image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = imageResponse.data.image_url;
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        try {
            if (selectedProduct) {
                // Update the existing product
                await updateProduct(selectedProduct.id, { ...newProduct, image: imageUrl });
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.id === selectedProduct.id ? { ...product, ...newProduct, image: imageUrl } : product
                    )
                );
                setSelectedProduct(null);
            } else {
                // Add a new product
                const response = await createProduct({ ...newProduct, image: imageUrl });
                setProducts(prevProducts => [...prevProducts, response.data]);
            }

            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const resetForm = () => {
        setNewProduct({
            name: '',
            category_id: '',
            bp: '',
            sp: '',
            image: '',
            image_file: null
        });
        setIsFormVisible(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setNewProduct({
            ...product,
            image_file: null
        });
        setIsFormVisible(true);
        setSelectedProduct(product);
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
            <button className="add-product-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
                {selectedProduct ? 'Edit Product' : 'Add Product'}
            </button>
            {isFormVisible && (
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="category_id"
                            value={newProduct.category_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Buying Price:
                        <input
                            type="number"
                            name="bp"
                            value={newProduct.bp}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Selling Price:
                        <input
                            type="number"
                            name="sp"
                            value={newProduct.sp}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Or choose file:
                        <input
                            type="file"
                            name="image_file"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit">
                        {selectedProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </form>
            )}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-item">
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
                            <div className="product-actions">
                                <button onClick={() => handleEditProduct(product)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
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

export default ClarkProduct;
