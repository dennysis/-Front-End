// src/api/api.jsx
import axios from 'axios';

const API_URL =process.env.REACT_APP_SERVER_API_URI; 

export const getTopSellingProduct = () => axios.get(`${API_URL}/top_selling_product`);
export const getBestSellerLast7Days = () => axios.get(`${API_URL}/best_seller_last_7_days`);
export const getTotalRevenue = () => axios.get(`${API_URL}/total_revenue`);
export const getTotalSaleReturn = () => axios.get(`${API_URL}/total_sale_return`);
export const getTotalPurchase = () => axios.get(`${API_URL}/total_purchase`);
export const getTotalIncome = () => axios.get(`${API_URL}/total_income`);


// Profile
export const getUserProfile = () => axios.get(`${API_URL}/profile`);

// Products
export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchCategories = () => axios.get(`${API_URL}/categories`);

// Authentication
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data,{withCredentials:true})
export const logout = () => axios.post(`${API_URL}/logout`);
export const checkSession = () => axios.get('http://127.0.0.1:5555/checksession', { withCredentials: true })

// User Management
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUser = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const updateUser = (userId, data) => axios.patch(`${API_URL}/users/${userId}`, data);

// Products
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (productId) => axios.get(`${API_URL}/product/${productId}`);
export const createProduct = (data) => axios.post(`${API_URL}/create_product`, data);
export const updateProduct = (productId, data) => axios.put(`${API_URL}/product/${productId}`, data);
export const deleteProduct = (productId) => axios.delete(`${API_URL}/product/${productId}`);

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getProductsByCategory = (categoryId) => axios.get(`${API_URL}/categories/${categoryId}/products`);

export const SalesChart = ()=> axios.get(`${API_URL}/sales_data`);
export const profile = ()=> axios.get(`${API_URL}/user/profile`);
export const getSupplyRequests = () => axios.get(`${API_URL}/supplyrequests`);
export const createSupplyRequest = (data) => axios.post(`${API_URL}/supplyrequests`, data);
export const updateSupplyRequest = (id, data) => axios.put(`${API_URL}/supplyrequests/${id}`, data);
export const deleteSupplyRequest = (id) => axios.delete(`${API_URL}/supplyrequests/${id}`);


export const createAdmin = (data) => axios.post(`${API_URL}/admins`, data);
export const updateAdmin = (id, data) => axios.put(`${API_URL}/admins/${id}`, data);
export const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`);
export const getAdmins = () => axios.get(`${API_URL}/admins`);
export const getAdmin = (id) => axios.get(`${API_URL}/admins/${id}`);



export const getPaymentStatus = () => axios.get(`${API_URL}/payment_status`);


export const initiateMpesaPayment = (data) => axios.post(`${API_URL}/mpesa_payment`, data);