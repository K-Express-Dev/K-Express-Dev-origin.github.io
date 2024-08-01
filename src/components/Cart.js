import React, { useState, useEffect, useRef } from 'react';
import './Cart.css';
import { FaTrash } from 'react-icons/fa';

function Cart({ toggleCart }) {
  // Initialize cart items from local storage or with a default item
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [
      { id: 1, name: 'Guruji Langar Dal', price: 58.45, servings: 6, quantity: 1, image: 'path_to_image.jpg' },
    ];
  });

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

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Local storage updated:', JSON.stringify(cartItems));
  }, [cartItems]);

  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    console.log('Cart items after increment:', JSON.stringify(updatedCartItems));
  };

  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    console.log('Cart items after decrement:', JSON.stringify(updatedCartItems));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const addTestItem = () => {
    const newItem = {
      id: cartItems.length + 1,
      name: 'Test Item',
      price: 10.00,
      servings: 1,
      quantity: 1,
      image: 'path_to_image.jpg'
    };
    setCartItems([...cartItems, newItem]);
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