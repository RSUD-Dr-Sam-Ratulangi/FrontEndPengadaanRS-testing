import React from 'react';
// import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import dashboardImage from '../assets/statistik.JPG';
import '../assets/navigation.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-links">
        {/* <Link to="/products">Products</Link> */}
        {/* Hapus Link ke halaman Users */}
      </div>
      <h1>Selamat Datang ,</h1>
      <p>Statistik Analisis</p>
      <img src={dashboardImage} alt="Dashboard Statistik" />
      <div className="scrollbar-container">
        {/* Content goes here */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
