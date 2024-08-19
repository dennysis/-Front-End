// src/api/api.jsx
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_API_URI;

export const getTopSellingProduct = () => axios.get(`${API_URL}/top_selling_product`, {
  withCredentials: true
});
export const getBestSellerLast7Days = () => axios.get(`${API_URL}/best_seller_last_7_days`, {
  withCredentials: true
});
export const getTotalRevenue = () => axios.get(`${API_URL}/total_revenue`, {
  withCredentials: true
});
export const getTotalSaleReturn = () => axios.get(`${API_URL}/total_sale_return`, {
  withCredentials: true
});
export const getTotalPurchase = () => axios.get(`${API_URL}/total_purchase`, {
  withCredentials: true
});
export const getTotalIncome = () => axios.get(`${API_URL}/total_income`, {
  withCredentials: true
});

// Profile
export const getUserProfile = () => axios.get(`${API_URL}/profile`, {
  withCredentials: true
});

// Products
export const fetchProducts = () => axios.get(`${API_URL}/products`, {
  withCredentials: true
});
export const fetchCategories = () => axios.get(`${API_URL}/categories`, {
  withCredentials: true
});

// Authentication
export const signup = (data) => axios.post(`${API_URL}/signup`, data, {
  withCredentials: true
});
export const login = (data) => axios.post(`${API_URL}/login`, data, {
  withCredentials: true
});
export const logout = () => axios.post(`${API_URL}/logout`, {}, {
  withCredentials: true
});
export const checkSession = () => axios.get(`${API_URL}/checksession`, {
  withCredentials: true
});

// User Management
export const getUsers = () => axios.get(`${API_URL}/users`, {
  withCredentials: true
});
export const getUser = (userId) => axios.get(`${API_URL}/users/${userId}`, {
  withCredentials: true
});
export const updateUser = (userId, data) => axios.patch(`${API_URL}/users/${userId}`, data, {
  withCredentials: true
});

// Products
export const getProducts = () => axios.get(`${API_URL}/products`, {
  withCredentials: true
});
export const getProduct = (productId) => axios.get(`${API_URL}/product/${productId}`, {
  withCredentials: true
});
export const createProduct = (data) => axios.post(`${API_URL}/create_product`, data, {
  withCredentials: true
});
export const updateProduct = (productId, data) => axios.put(`${API_URL}/product/${productId}`, data, {
  withCredentials: true
});
export const deleteProduct = (productId) => axios.delete(`${API_URL}/product/${productId}`, {
  withCredentials: true
});

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`, {
  withCredentials: true
});
export const getProductsByCategory = (categoryId) => axios.get(`${API_URL}/categories/${categoryId}/products`, {
  withCredentials: true
});

export const SalesChart = () => axios.get(`${API_URL}/sales_data`, {
  withCredentials: true
});
export const profile = () => axios.get(`${API_URL}/user/profile`, {
  withCredentials: true
});
export const getSupplyRequests = () => axios.get(`${API_URL}/supplyrequests`, {
  withCredentials: true
});
export const createSupplyRequest = (data) => axios.post(`${API_URL}/supplyrequests`, data, {
  withCredentials: true
});
export const updateSupplyRequest = (id, data) => axios.put(`${API_URL}/supplyrequests/${id}`, data, {
  withCredentials: true
});
export const deleteSupplyRequest = (id) => axios.delete(`${API_URL}/supplyrequests/${id}`, {
  withCredentials: true
});

export const createAdmin = (data) => axios.post(`${API_URL}/admins`, data, {
  withCredentials: true
});
export const updateAdmin = (id, data) => axios.put(`${API_URL}/admins/${id}`, data, {
  withCredentials: true
});
export const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`, {
  withCredentials: true
});
export const getAdmins = () => axios.get(`${API_URL}/admins`, {
  withCredentials: true
});
export const getAdmin = (id) => axios.get(`${API_URL}/admins/${id}`, {
  withCredentials: true
});

export const getPaymentStatus = () => axios.get(`${API_URL}/payment_status`, {
  withCredentials: true
});

export const initiateMpesaPayment = (data) => axios.post(`${API_URL}/mpesa_payment`, data, {
  withCredentials: true
});
