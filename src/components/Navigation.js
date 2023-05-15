import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../assets/navigation.css';

const Navigation = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon profil diklik
  };
 
  const handleLogoutClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon logout diklik
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/vendor">
            Request Products
          </Link>
        </li>
        <li>
          <Link to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link to="/orders">
            Orders
          </Link>
        </li>
      </ul>
      <div className="navigation-icons">
        <Link to="/notifications" className="notification-icon" onClick={handleNotificationClick}>
          <FontAwesomeIcon icon={faBell} />
          {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
        </Link>
        <Link to="/profile" className="profile-icon" onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/logout" className="logout-icon" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
