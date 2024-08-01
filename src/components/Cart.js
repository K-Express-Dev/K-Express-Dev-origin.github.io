import React from 'react';
import './Cart.css';

function Cart({ toggleCart }) {
  return (
    <div className="cart">
      <button className="close-cart" onClick={toggleCart}>X</button>
      <h2>Your Cart</h2>
      <ul>
        {/* Cart items would be listed here */}
        <li>
          <span>Item 1</span>
          <span>$10.00</span>
        </li>
        <li>
          <span>Item 2</span>
          <span>$15.00</span>
        </li>
      </ul>
      <button className="checkout-button">Checkout</button>
    </div>
  );
}

export default Cart;