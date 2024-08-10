// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerPage from './components/SellerPage';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setShowCart(true); // Open the cart when an item is added
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
    setShowCart(true); // Open the cart when quantity is updated
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <GoogleOAuthProvider clientId="526350682823-d30q8ds3j0pktkqvkdt2sqm78speucr0.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Navbar toggleCart={toggleCart} cartItemCount={cartItemCount} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
              <Route path="/seller/:id" element={<SellerPage addToCart={addToCart} />} />
            </Routes>
            {showCart && (
              <Cart 
                cartItems={cartItems} 
                toggleCart={toggleCart} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                addToCart={addToCart}
              />
            )}
          </div>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;