import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

function Cart({ toggleCart }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Guruji Langar Dal', price: 58.45, servings: 6, quantity: 1, image: 'path_to_image.jpg' },
  ]);

  const incrementQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const addTestItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Test Dish ${cartItems.length + 1}`,
      price: +(Math.random() * 50 + 10).toFixed(2),
      servings: Math.floor(Math.random() * 5) + 1,
      quantity: 1,
      image: 'path_to_placeholder_image.jpg'
    };
    setCartItems([...cartItems, newItem]);
  };

  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart">
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
              <button className="remove-item" onClick={() => removeItem(item.id)}>
                <FaTrash />
              </button>
              <div className="cart-item-quantity">
                <button className="quantity-button" onClick={() => decrementQuantity(item.id)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="checkout-button">Checkout</button>
      <button className="add-test-item-button" onClick={addTestItem}>Add Test Item</button>
    </div>
  );
}

export default Cart;