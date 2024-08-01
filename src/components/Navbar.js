import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ toggleCart }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">K-Express</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-item">Menu</Link>
        <Link to="/about" className="navbar-item">About Us</Link>
        <Link to="/login" className="navbar-login">Login</Link>
        <Link to="/signup" className="navbar-signup">Sign Up</Link>
        <button className="navbar-cart" onClick={toggleCart}>
          <FaShoppingCart />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;