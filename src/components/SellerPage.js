import React from 'react';
import { FaStar, FaCheck, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import './SellerPage.css';

const SellerPage = () => {
  const seller = {
    name: "ahaar tiffins",
    image: "/path/to/seller-image.jpg",
    rating: 4.9,
    reviewCount: 313,
    mealsPrepared: 997,
    certifications: ["Food safety"],
    description: "Good News for new K-express customers only !! New customers get $15 off their next 3 orders, use my referral code shef-aahaar-986 for your next order. 🍊 Food that makes you happy 😊 My name is Parul and I am from Delhi India.",
    cuisineTypes: ["Organic", "North Indian", "Punjabi", "Indian", "Delhi", "Vegetarian", "Comfort"],
  };

  const popularDishes = [
    { name: 'Guruji Langar Dal', image: '/path/to/dal.jpg', rating: 96, reviewCount: 26, servings: '1 serving', price: 12.99 },
    { name: 'Phulka Roti', image: '/path/to/roti.jpg', rating: 96, reviewCount: 47, servings: '1-2 servings', price: 5.99 },
    { name: 'Palak Paneer', image: '/path/to/palak.jpg', rating: 95, reviewCount: 40, servings: '1 serving', price: 11.99 },
    { name: 'Shimla Mirch Aloo', image: '/path/to/aloo.jpg', rating: 95, reviewCount: 19, servings: '1 serving', price: 10.99 },
    { name: 'Tiffin Combo', image: '/path/to/tiffin.jpg', rating: 100, reviewCount: 21, servings: '1 serving', price: 15.99 },
  ];

  return (
    <div className="seller-page">
      <div className="seller-header">
        <img src={seller.image} alt={seller.name} className="seller-image" />
        <div className="seller-info">
          <h1>{seller.name}</h1>
          <p className="cuisine-types">{seller.cuisineTypes.join(' · ')}</p>
          <div className="seller-stats">
            <span><FaStar /> {seller.rating} ({seller.reviewCount} reviews)</span>
            <span>{seller.mealsPrepared} Meals prepared</span>
            <span><FaCheck /> {seller.certifications[0]}</span>
          </div>
          <div className="seller-actions">
            <button className="action-button"><FaHeart /> Follow</button>
            <button className="action-button"><FaComment /> Message</button>
            <button className="action-button"><FaShare /> Share</button>
          </div>
        </div>
      </div>
      <p className="seller-description">{seller.description}</p>
      
      <div className="seller-menu">
        <div className="menu-filters">
          <button>Protein</button>
          <button>Dietary</button>
          <button>More filters</button>
        </div>
        <h2>Browse By Meal Type</h2>
        <div className="meal-types">
          <button>Popular</button>
          <button>Eco Packaging</button>
          <button>Mains</button>
          <button>Sides</button>
        </div>
      </div>

      <div className="popular-dishes">
        <h2>Popular dishes</h2>
        <div className="dishes-grid">
          {popularDishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p className="dish-rating"><FaStar /> {dish.rating}% ({dish.reviewCount})</p>
              <p>{dish.servings}</p>
              <p className="dish-price">${dish.price.toFixed(2)}</p>
              <button className="add-to-cart">Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;