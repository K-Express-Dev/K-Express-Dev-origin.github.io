import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component that renders the navigation bar.
 * It includes links to different pages and a button.
 */
function Navbar({ toggleCart }) {
  return (
    <nav className="navbar">
      {/* Left section of the navbar */}
      <div className="navbar-left">
        {/* Link to the home page with brand name */}
        <Link to="/" className="navbar-brand">K-Express</Link>
      </div>
      {/* Right section of the navbar */}
      <div className="navbar-right">
        {/* Link to the home page */}
        <Link to="/" className="navbar-item">Menu</Link>
        {/* Link to the about us page */}
        <Link to="/about" className="navbar-item">About Us</Link>
        {/* Link to the login page */}
        <Link to="/login" className="navbar-login">Login</Link>
        {/* Link to the signup page */}
        <Link to="/signup" className="navbar-signup">Sign Up</Link>
        {/* Button for the cart */}
        <button className="cart" onClick={toggleCart}>Cart</button>
      </div>
    </nav>
  );
}

export default Navbar;