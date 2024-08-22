import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import logoImage from './images/K-Express-Logo.png'; // Import your logo image

function Navbar({ toggleCart, cartItemCount, isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={logoImage} alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-item">Menu</Link>
        <Link to="/about" className="navbar-item">About Us</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="navbar-item">
              <FaUserCircle size={20} />
            </Link>
            <button onClick={onLogout} className="navbar-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-login">Login</Link>
            <Link to="/signup" className="navbar-signup">Sign Up</Link>
          </>
        )}
        <button className="navbar-cart" onClick={toggleCart}>
          <FaShoppingCart />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;