import React, { useState, useEffect, useRef } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

/**
 * Cart component to display and manage items in the shopping cart.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.toggleCart - Function to toggle the visibility of the cart.
 */
function Cart({ toggleCart }) {
  const navigate = useNavigate();

  // Initialize cart items from local storage or with a default item
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [
      { id: 1, name: 'Guruji Langar Dal', price: 58.45, servings: 6, quantity: 1, image: 'path_to_image.jpg' },
    ];
  });

  /**
   * Calculate the total number of items in the cart.
   * 
   * @param {Array} items - Array of cart items.
   * @returns {number} - Total number of items.
   */
  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const cartRef = useRef(null);

  useEffect(() => {
    /**
     * Handle click outside the cart to close it.
     * 
     * @param {MouseEvent} event - The mouse event.
     */
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

  /**
   * Increment the quantity of a cart item by its ID.
   * 
   * @param {number} id - The ID of the cart item.
   */
  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    console.log('Cart items after increment:', JSON.stringify(updatedCartItems));
  };

  /**
   * Decrement the quantity of a cart item by its ID.
   * 
   * @param {number} id - The ID of the cart item.
   */
  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    console.log('Cart items after decrement:', JSON.stringify(updatedCartItems));
  };

  /**
   * Remove a cart item by its ID.
   * 
   * @param {number} id - The ID of the cart item.
   */
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  /**
   * Calculate the total price of a cart item.
   * 
   * @param {Object} item - The cart item.
   * @returns {string} - The total price formatted to two decimal places.
   */
  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  /**
   * Add a test item to the cart.
   */
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

  /**
   * Handle the checkout process.
   */
  const handleCheckout = () => {
    toggleCart(); // Close the cart
    navigate('/checkout', { state: { cartItems } }); // Navigate to checkout page with cart items
  };

  /**
   * Render the cart component.
   * 
   * @returns {JSX.Element} The cart component.
   */
  return (
  <div className="cart" ref={cartRef}>
    {/* Button to close the cart */}
    <button className="close-cart" onClick={toggleCart}>&times;</button>
    
    {/* Cart title */}
    <h2>Your Cart</h2>
    
    {/* List of cart items */}
    <ul>
      {cartItems.map(item => (
        <li key={item.id} className="cart-item">
          {/* Item image */}
          <img src={item.image} alt={item.name} className="cart-item-image" />
          
          {/* Item details */}
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">${calculateTotalPrice(item)}</div>
            <div className="cart-item-servings">{item.servings} servings</div>
          </div>
          
          {/* Item actions */}
          <div className="cart-item-actions">
            {/* Button to remove item */}
            <button className="remove-item" onClick={() => removeItem(item.id)}>
              <FaTrash />
            </button>
            
            {/* Quantity controls */}
            <div className="cart-item-quantity">
              <button className="quantity-button" onClick={() => decrementQuantity(item.id)}>-</button>
              <span className="quantity-value">{item.quantity}</span>
              <button className="quantity-button" onClick={() => incrementQuantity(item.id)}>+</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
    
    {/* Checkout button */}
    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    
    {/* Total items display */}
    <div>Total items: {calculateTotalItems(cartItems)}</div>
    
    {/* Button to add a test item */}
    <button className="add-test-item-button" onClick={addTestItem}>Add Test Item</button>
  </div>
  );
}

export default Cart;