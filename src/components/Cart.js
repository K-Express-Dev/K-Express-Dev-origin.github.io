import React, { useState } from 'react';
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
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
              <div className="cart-item-servings">{item.servings} servings</div>
            </div>
            <div className="cart-item-quantity">
              <button className="quantity-button" onClick={() => decrementQuantity(item.id)}>-</button>
              <span className="quantity-value">{item.quantity}</span>
              <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="checkout-button">Checkout</button>
    </div>
  );
}

export default Cart;