import React from 'react';
import './SellerBox.css';

const SellerBox = ({ image, title, seller, locations, days }) => {
  return (
    <div className="seller-box">
      <div className="food-image">
        <img src={image} alt={title} />
      </div>
      <div className="seller-info">
        <h3>{title}</h3>
        <p>{seller}</p>
        <p>
          <i className="fas fa-map-marker-alt"></i> {locations.join(' | ')}
        </p>
        <p>
          <i className="far fa-calendar-alt"></i> {days.join(' | ')}
        </p>
      </div>
    </div>
  );
};

export default SellerBox;