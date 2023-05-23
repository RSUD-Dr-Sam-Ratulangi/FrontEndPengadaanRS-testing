import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSignOutAlt,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../config/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "../assets/navigation.css";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [notificationCount, setNotificationCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon profil diklik
  };

  const handleLogoutClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon logout diklik
    dispatch(logout());
    console.log("Berhasil Logout");
    navigate("/signIn");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        {isLoggedIn && (
          <div>
            <li>
              <Link to="/vendor">Request Products</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </div>
        )}
      </ul>
      <div className="navigation-icons">
        {isLoggedIn && (
          <div>
            <Link
              to="/notifications"
              className="notification-icon"
              onClick={handleNotificationClick}
            >
              <FontAwesomeIcon icon={faBell} />
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </Link>
            <Link
              to="/profile"
              className="profile-icon"
              onClick={handleProfileClick}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        )}

        {!isLoggedIn && (
          <div>
            <Link to="/signIn" className="logout-icon">
              <FontAwesomeIcon icon={faSignIn} />
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <button className="logout-icon" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
