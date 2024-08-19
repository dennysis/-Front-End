import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Instock from "./components/InStock";
import Products from "./components/Products";
import Settings from "./components/Settings";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NotFound from "./components/Error404";
import Appearance from './components/Appearance';
import Profile from "./components/Profile";
import Login from "./components/Login";
import { useTheme } from './components/ThemeContext';
import AdminDashboard from './components/Admin/AdminDashboard';
import SupplyRequest from './components/Admin/SupplyRequest';
import PaymentStatus from './components/Admin/PaymentStatus';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAuthPage from "./components/Admin/AdminAuthPage";
// import ProtectedRoute from "./components/Admin/ProtectedRoute";
import ClarkProducts from './components/Clark/ClarkProducts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toCart, setCart] = useState([]);
  const { theme, fontSize } = useTheme();

  const addToCart = (product) => {
    setCart([...toCart, product]);
    console.log(toCart);
  };
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
};

  useEffect(() => {
    document.body.className = `${theme} ${fontSize}`;
  }, [theme, fontSize]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
      path="/profile"
      element={<ProtectedRoute element={Profile} />}
    />
          <Route path="/stock" element={<Instock />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={toCart}  updateCart={updateCart}/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated} />} />
         <Route path="/appearance" element={<Appearance />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/paymentstatus" element={<PaymentStatus />} />
          <Route path="/admin/login" element={< AdminAuthPage/>} />
          <Route path="/clark-products" element={<ClarkProducts />} />
          <Route path="/admin/supplyrequest" element={<SupplyRequest />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
