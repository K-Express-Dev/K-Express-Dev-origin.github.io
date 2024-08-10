import React, { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import './SellerPage.css';
import Cart from './Cart'; // Make sure to import the Cart component

const SellerPage = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    { 
      id: 1,
      name: 'Guruji Langar Dal', 
      image: '/path/to/dal.jpg', 
      rating: 96, 
      reviewCount: 26, 
      servings: '1 serving', 
      price: 12.99, 
      description: 'This is a very tasty and healthy dish. It is made with organic ingredients.'
    },
    { 
      id: 2,
      name: 'Phulka Roti', 
      image: '/path/to/roti.jpg', 
      rating: 96, 
      reviewCount: 47, 
      servings: '1-2 servings', 
      price: 5.99, 
      description: 'Soft and fluffy whole wheat flatbread, perfect for scooping up curries and dals.'
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

  const addToCart = (dish) => {
    const existingItem = cartItems.find(item => item.id === dish.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
    setIsCartOpen(true);
    handleClosePopup();
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
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
          <button>Eco Packaging</button>
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
              <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(dish); }}>Add to cart</button>
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
            <button className="add-to-cart-popup" onClick={() => addToCart(selectedDish)}>Add to cart</button>
          </div>
        </div>
      )}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          toggleCart={toggleCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default SellerPage;