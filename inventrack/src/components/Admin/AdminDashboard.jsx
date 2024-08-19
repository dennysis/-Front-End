import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import SupplyRequest from '../Admin/SupplyRequest.jsx'; // Import SupplyRequest component
import './AdminDashboard.css';
import AdminAuthPage from './AdminAuthPage.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    bestSellerLast7Days: null,
    totalRevenue: null,
    totalSaleReturn: null,
    totalPurchase: null,
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics data
        const [bestSellerLast7DaysResponse, totalRevenueResponse, totalSaleReturnResponse, totalPurchaseResponse] = await Promise.all([
          axios.get("http://127.0.0.1:5555/best_seller_last_7_days"),
          axios.get("http://127.0.0.1:5555/total_revenue"),
          axios.get("http://127.0.0.1:5555/total_sale_return"),
          axios.get("http://127.0.0.1:5555/total_purchase"),
        ]);

        setData({
          bestSellerLast7Days: bestSellerLast7DaysResponse.data,
          totalRevenue: totalRevenueResponse.data,
          totalSaleReturn: totalSaleReturnResponse.data,
          totalPurchase: totalPurchaseResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { bestSellerLast7Days, totalRevenue, totalSaleReturn, totalPurchase } = data;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav className="admin-nav">
        
        <button onClick={() => handleNavigation('/admin/paymentstatus')} className="admin-button">Payment Status</button>
        {/* <button onClick={() => handleNavigation('/admin/users')} className="admin-button">Manage Users</button> */}
        <button onClick={() => handleNavigation('/admin/supplyrequest')} className="admin-button">Supply Requests</button>
      </nav>
      <div className="admin-actions">
       
      </div>
      <div className="chart-container">
        <h2>Product Sales Chart</h2>
        <ChartComponent />
      </div>
      <div className="statistics">
        <div className="card">
          <h2>Best Seller from Last 7 Days</h2>
          {bestSellerLast7Days ? (
            <p>{bestSellerLast7Days.product}: {bestSellerLast7Days.total_quantity}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          {totalRevenue ? (
            <p>${totalRevenue.total_revenue}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="card">
          <h2>Total Sale Return</h2>
          {totalSaleReturn ? (
            <p>${totalSaleReturn.total_sale_return}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="card">
          <h2>Total Purchase</h2>
          {totalPurchase ? (
            <p>${totalPurchase.total_purchase}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
