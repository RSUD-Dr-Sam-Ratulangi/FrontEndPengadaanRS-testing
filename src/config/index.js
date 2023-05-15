import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productpages from '../pages/Productpages';
import Dashboard from '../pages/Dashboard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vendorpages from '../pages/Vendorpages';
import Vendorreqtable from '../pages/Vendorreqtable';
import Orderpages from '../pages/Orderpages';


const Routers = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Productpages />} />
        <Route path="/vendor" element={<Vendorpages />} /> {/* Update the route path to "/vendor" */}
        <Route path="/vendorlist" element={<Vendorreqtable />} />
        <Route path="/orders" element={<Orderpages />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;
