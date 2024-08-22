// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth} from './components/firebase'; // Make sure to import auth from your firebase config
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerPage from './components/SellerPage';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import './App.css';
import Profile from './components/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

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
    setShowCart(true);
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
    setShowCart(true);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <Navbar 
            toggleCart={toggleCart} 
            cartItemCount={cartItemCount} 
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
              <Route path="/seller/:id" element={<SellerPage addToCart={addToCart} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />


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