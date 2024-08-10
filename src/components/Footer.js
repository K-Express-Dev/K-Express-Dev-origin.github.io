// components/Footer.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleClick = (event, to) => {
    event.preventDefault();
    if (to === location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate(to);
    }
  };

  const CustomLink = ({ to, children }) => (
    <Link to={to} onClick={(e) => handleClick(e, to)}>{children}</Link>
  );

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>            
          <CustomLink to="/">K-Express</CustomLink>
          </h2>
        </div>
        <div className="footer-section">
          <h3>Learn More</h3>
          <ul>
            <li><CustomLink to="/about">About Us</CustomLink></li>
            <li><CustomLink to="/faq">FAQ</CustomLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul> 
          <li><CustomLink to="/form">Contact Form</CustomLink></li>
          <a href="http://www.xavier.com/" target="_blank" rel="noopener noreferrer">Web Developer</a>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 K-Express. All rights reserved.</p>
        <div className="footer-links">
          <CustomLink to="/terms">Terms of Service</CustomLink>
          <CustomLink to="/privacy">Privacy</CustomLink>
          <CustomLink to="/delivery-locations">Delivery Locations</CustomLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;