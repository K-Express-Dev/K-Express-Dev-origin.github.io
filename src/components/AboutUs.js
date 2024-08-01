// src/components/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us">
        <div className="about-content">
          <h1>The Power of Homemade Korean Food</h1>
          <p>
            At K-Express, we’re rebuilding the food system from scratch, redefining who can participate in the food economy,
            and returning personal connection to the making, eating, and sharing of food.
            <strong> We are an online marketplace for local, food safety certified cooks to connect with customers in their community and earn a meaningful income selling homemade Korean dishes.</strong>
          </p>
          <p>
            Homemade Korean food is the aroma of your childhood kitchen, the laughter around a family table, the taste of locally
            sourced produce; it’s memories, nostalgia, and tradition. It’s building bridges between cultures and people
            that make us whole.
          </p>
          <p>
            More than anything, the power of homemade Korean food comes from the love and care of those who make it, all opening
            up their hearts to provide the gift of a homemade meal to you.
          </p>
        </div>
        <div className="about-image">
          <img src="/aboutus1.jpeg" alt="About Us" />
          <div className="about-caption">
            <h2></h2>
            <p> </p>
          </div>
        </div>
      </div>

      <div className="second-section">
        <div className="section-content">
          <div className="section-image">
            <img src="/aboutus2.jpeg" alt="For Customers" />
          </div>
          <div className="section-text">
            <h2>For Customers</h2>
            <p>With thousands of restaurants, convenience stores, pet stores, grocery stores, and more at your fingertips, K-Express delivers the best of your neighborhood on-demand.</p>
            <Link to="/" className="section-button">Start an Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
