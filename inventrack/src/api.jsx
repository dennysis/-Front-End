// src/api/api.jsx
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_API_URI;

const withCredentialsConfig = { withCredentials: true };

export const getTopSellingProduct = () => axios.get(`${API_URL}/top_selling_product`, withCredentialsConfig);
export const getBestSellerLast7Days = () => axios.get(`${API_URL}/best_seller_last_7_days`, withCredentialsConfig);
export const getTotalRevenue = () => axios.get(`${API_URL}/total_revenue`, withCredentialsConfig);
export const getTotalSaleReturn = () => axios.get(`${API_URL}/total_sale_return`, withCredentialsConfig);
export const getTotalPurchase = () => axios.get(`${API_URL}/total_purchase`, withCredentialsConfig);
export const getTotalIncome = () => axios.get(`${API_URL}/total_income`, withCredentialsConfig);

// Profile
export const getUserProfile = () => axios.get(`${API_URL}/profile`, withCredentialsConfig);

// Products
export const fetchProducts = () => axios.get(`${API_URL}/products`, withCredentialsConfig);
export const fetchCategories = () => axios.get(`${API_URL}/categories`, withCredentialsConfig);

// Authentication
export const signup = (data) => axios.post(`${API_URL}/signup`, data, withCredentialsConfig);
export const login = (data) => axios.post(`${API_URL}/login`, data, withCredentialsConfig);
export const logout = () => axios.post(`${API_URL}/logout`, {}, withCredentialsConfig);
export const checkSession = () => axios.get(`${API_URL}/checksession`, withCredentialsConfig);

// User Management
export const getUsers = () => axios.get(`${API_URL}/users`, withCredentialsConfig);
export const getUser = (userId) => axios.get(`${API_URL}/users/${userId}`, withCredentialsConfig);
export const updateUser = (userId, data) => axios.patch(`${API_URL}/users/${userId}`, data, withCredentialsConfig);

// Products
export const getProducts = () => axios.get(`${API_URL}/products`, withCredentialsConfig);
export const getProduct = (productId) => axios.get(`${API_URL}/product/${productId}`, withCredentialsConfig);
export const createProduct = (data) => axios.post(`${API_URL}/create_product`, data, withCredentialsConfig);
export const updateProduct = (productId, data) => axios.put(`${API_URL}/product/${productId}`, data, withCredentialsConfig);
export const deleteProduct = (productId) => axios.delete(`${API_URL}/product/${productId}`, withCredentialsConfig);

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`, withCredentialsConfig);
export const getProductsByCategory = (categoryId) => axios.get(`${API_URL}/categories/${categoryId}/products`, withCredentialsConfig);

export const SalesChart = () => axios.get(`${API_URL}/sales_data`, withCredentialsConfig);
export const profile = () => axios.get(`${API_URL}/user/profile`, withCredentialsConfig);
export const getSupplyRequests = () => axios.get(`${API_URL}/supplyrequests`, withCredentialsConfig);
export const createSupplyRequest = (data) => axios.post(`${API_URL}/supplyrequests`, data, withCredentialsConfig);
export const updateSupplyRequest = (id, data) => axios.put(`${API_URL}/supplyrequests/${id}`, data, withCredentialsConfig);
export const deleteSupplyRequest = (id) => axios.delete(`${API_URL}/supplyrequests/${id}`, withCredentialsConfig);

export const createAdmin = (data) => axios.post(`${API_URL}/admins`, data, withCredentialsConfig);
export const updateAdmin = (id, data) => axios.put(`${API_URL}/admins/${id}`, data, withCredentialsConfig);
export const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`, withCredentialsConfig);
export const getAdmins = () => axios.get(`${API_URL}/admins`, withCredentialsConfig);
export const getAdmin = (id) => axios.get(`${API_URL}/admins/${id}`, withCredentialsConfig);

export const getPaymentStatus = () => axios.get(`${API_URL}/payment_status`, withCredentialsConfig);

export const initiateMpesaPayment = (data) => axios.post(`${API_URL}/mpesa_payment`, data, withCredentialsConfig);
