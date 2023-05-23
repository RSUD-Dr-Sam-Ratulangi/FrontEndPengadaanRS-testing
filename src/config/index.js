import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productpages from "../pages/Productpages";
import Dashboard from "../pages/Dashboard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Vendorpages from "../pages/Vendorpages";
// import Vendorreqtable from '../pages/Vendorreqtable';
import Orderpages from "../pages/Orderpages";
import Notificationpages from "../pages/Notificationpages";
import Profilpages from "../pages/Profilpages";
import SignInpages from "../pages/SignInpages";
import { useSelector } from "react-redux";

const Routers = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {isLoggedIn && (
          <>
            <Route path="/products" element={<Productpages />} />
            <Route path="/vendor" element={<Vendorpages />} />{" "}
            {/* Update the route path to "/vendor" */}
            {/* <Route path="/vendorlist" element={<Vendorreqtable />} /> */}
            <Route path="/orders" element={<Orderpages />} />
            <Route path="/notifications" element={<Notificationpages />} />
            <Route path="/profile" element={<Profilpages />} />
          </>
        )}
        <Route path="/signIn" element={<SignInpages />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;
