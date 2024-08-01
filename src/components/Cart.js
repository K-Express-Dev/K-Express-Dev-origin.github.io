import React, { useState } from 'react';
import './Cart.css';

function Cart({ toggleCart }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10.00, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15.00, quantity: 1 }
  ]);

  const addItem = () => {
    const newItem = { id: Date.now(), name: `Item ${cartItems.length + 1}`, price: (Math.random() * 20).toFixed(2), quantity: 1 };
    setCartItems([...cartItems, newItem]);
  };

  const deleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

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
      <button className="close-cart" onClick={toggleCart}>X</button>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>Unit Price: ${item.price}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Total Price: ${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="checkout-button">Checkout</button>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default Cart;