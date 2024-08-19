import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css'; 

const Home = () => {
    const [data, setData] = useState({
        bestSellerLast7Days: null,
        totalRevenue: null,
        totalSaleReturn: null,
        totalPurchase: null,
        totalIncome: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    const { bestSellerLast7Days, totalRevenue, totalSaleReturn, totalPurchase,  } = data;

    return (
        <div className="home-container">
            <header className="welcome-header">
                <h1>Welcome to Our Dashboard</h1>
                <p>Your one-stop solution for managing sales, revenue, and more.</p>
                <img
                    src="https://st.depositphotos.com/9999814/52407/i/450/depositphotos_524071248-stock-photo-smart-warehouse-management-system-with.jpg"
                    alt="Welcome"
                    className="welcome-image"
                />
            </header>
            
            <div className="card-container">
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

export default Home;
