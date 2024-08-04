import React from 'react';
import { Link } from 'react-router-dom';
import SellerBox from './SellerBox';
import './Home.css';

const Home = () => {
  const sellers = [
    {
      id: 1,
      image: '/path/to/korean-bbq-image.jpg',
      title: 'Korean BBQ Meals',
      seller: 'First Last',
      locations: ['Irvine, CA', 'San Diego, CA'],
      days: ['Wednesday', 'Saturday'],
    },
    {
      id: 2,
      image: '/path/to/stew-soup-image1.jpg',
      title: 'Stew & Soup Meals',
      seller: 'First Last',
      locations: ['Irvine, CA'],
      days: ['Wednesday', 'Friday'],
    },
    {
      id: 3,
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
        <div className="transparent-box"></div>
        <h1>Freshly Made, Local Korean Food</h1>
        <div className="location-selector">
          <i className="fas fa-map-marker-alt"></i>
          <select>
            <option>Irvine, CA</option>
            <option>San Diego, CA</option>
            <option>Anaheim, CA</option>
          </select>
        </div>
      </div>
      <div className="seller-boxes">
        {sellers.map((seller) => (
          <Link key={seller.id} to={`/seller/${seller.id}`} className="seller-link">
            <SellerBox {...seller} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;