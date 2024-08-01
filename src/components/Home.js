import React from 'react';
import SellerBox from './SellerBox';
import './Home.css';

const Home = () => {
  const sellers = [
    {
      image: '/path/to/korean-bbq-image.jpg',
      title: 'Korean BBQ Meals',
      seller: 'First Last',
      locations: ['Irvine, CA', 'San Diego, CA'],
      days: ['Wednesday', 'Saturday'],
    },
    {
      image: '/path/to/stew-soup-image1.jpg',
      title: 'Stew & Soup Meals',
      seller: 'First Last',
      locations: ['Irvine, CA'],
      days: ['Wednesday', 'Friday'],
    },
    {
      image: '/path/to/stew-soup-image2.jpg',
      title: 'Stew & Soup Meals',
      seller: 'First Last',
      locations: ['Irvine, CA'],
      days: ['Wednesday', 'Friday'],
    },
  ];

  return (
    <div className="home">
      <div className="hero">
        <div className="transparent-box"></div> {/* Transparent box added here */}
        <h1>Freshly Made, Local Korean Food</h1>
        <div className="location-selector">
          <i className="fas fa-map-marker-alt"></i>
          <select>
            <option>Irvine, CA</option>
            <option>San Diego, CA</option>
            <option>Anaheim, CA</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="seller-boxes">
        {sellers.map((seller, index) => (
          <SellerBox key={index} {...seller} />
        ))}
      </div>
    </div>
  );
};

export default Home;
