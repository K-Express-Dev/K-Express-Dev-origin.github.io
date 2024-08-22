import React, { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import './SellerPage.css';
import octoingred from './images/octo_ingred.jpeg'
import khotpot from './images/four_packed.jpeg'
import spicyOctopusImage from './images/spicy_octopus.jpeg';

const SellerPage = ({ addToCart }) => {
  const [selectedDish, setSelectedDish] = useState(null);

  const seller = {
    name: "Irvine Dining",
    image: spicyOctopusImage,
    rating: 4.9,
    reviewCount: 313,
    mealsPrepared: 997,
    certifications: ["Food safety"],
    description: "",
    cuisineTypes: ["Organic", "Korean", "Stews", "Vegetarian", "Comfort"],
  };

  const popularDishes = [
    { 
      id: 1,
      name: 'Spicy Octopus', 
      image: octoingred, 
      rating: 96, 
      reviewCount: 26, 
      servings: '1 serving', 
      price: 12.99, 
      description: 'This is a very tasty and healthy dish. It is made with organic ingredients.'
    },
    { 
      id: 2,
      name: 'Korean Hotpot Stew', 
      image: khotpot, 
      rating: 96, 
      reviewCount: 47, 
      servings: '1-2 servings', 
      price: 5.99, 
      description: 'Soft and fluffy thin sliced briskets and noodles in Korean Pyogo Broth.'
    },
    { 
      id: 3,
      name: 'Palak Paneer', 
      image: '/path/to/palak.jpg', 
      rating: 95, 
      reviewCount: 40, 
      servings: '1 serving', 
      price: 11.99, 
      description: 'Creamy spinach curry with cubes of soft paneer cheese, a vegetarian favorite.'
    },
    { 
      id: 4,
      name: 'Shimla Mirch Aloo', 
      image: '/path/to/aloo.jpg', 
      rating: 95, 
      reviewCount: 19, 
      servings: '1 serving', 
      price: 10.99, 
      description: 'A flavorful combination of bell peppers and potatoes, seasoned with aromatic spices.'
    },
    { 
      id: 5,
      name: 'Tiffin Combo', 
      image: '/path/to/tiffin.jpg', 
      rating: 100, 
      reviewCount: 21, 
      servings: '1 serving', 
      price: 15.99, 
      description: 'A complete meal with a variety of dishes, perfect for a satisfying lunch or dinner.'
    },
  ];

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleClosePopup = () => {
    setSelectedDish(null);
  };

  const handleAddToCart = (dish) => {
    addToCart(dish);
    handleClosePopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedDish && !event.target.closest('.popup-content')) {
        handleClosePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDish]);

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
    
      <div className="popular-dishes">
        <h2>Popular dishes</h2>
        <div className="meal-types">
          <button>Popular</button>
          <button>Packaged</button>
          <button>Mains</button>
          <button>Sides</button>
        </div>
        <div className="dishes-grid">
          {popularDishes.map((dish) => (
            <div key={dish.id} className="dish-card" onClick={() => handleDishClick(dish)}>
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p className="dish-rating"><FaStar /> {dish.rating}% ({dish.reviewCount})</p>
              <p>{dish.servings}</p>
              <p className="dish-price">${dish.price.toFixed(2)}</p>
              <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(dish); }}>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
      {selectedDish && (
        <div className="popup">
          <div className="popup-overlay" onClick={handleClosePopup}></div>
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <img src={selectedDish.image} alt={selectedDish.name} className="popup-image" />
            <h2>{selectedDish.name}</h2>
            <p>{selectedDish.description}</p>
            <p>Servings: {selectedDish.servings}</p>
            <p>Price: ${selectedDish.price.toFixed(2)}</p>
            <button className="add-to-cart-popup" onClick={() => handleAddToCart(selectedDish)}>Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPage;