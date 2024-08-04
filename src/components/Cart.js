// Cart.js
import React, { useRef, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function Cart({ cartItems, toggleCart, removeFromCart, updateQuantity, addToCart }) {
  const navigate = useNavigate();
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleCart]);

  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout', { state: { cartItems } });
  };

  const addTestItem = () => {
    const testItem = {
      id: Date.now(), // Use timestamp as a unique id
      name: 'Test Item',
      price: 9.99,
      servings: 1,
      quantity: 1,
      image: 'https://via.placeholder.com/60' // Placeholder image
    };
    addToCart(testItem);
  };

  return (
    <div className="cart" ref={cartRef}>
      <button className="close-cart" onClick={toggleCart}>&times;</button>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${calculateTotalPrice(item)}</div>
              <div className="cart-item-servings">{item.servings} servings</div>
            </div>
            <div className="cart-item-actions">
              <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                <FaTrash />
              </button>
              <div className="cart-item-quantity">
                <button className="quantity-button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      <div>Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
      <button className="add-test-item-button" onClick={addTestItem}>Add Test Item</button>
    </div>
  );
}

export default Cart;