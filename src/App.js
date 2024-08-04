import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerPage from './components/SellerPage';
import './App.css';

function App() {
  // State to manage cart visibility
  const [showCart, setShowCart] = useState(false);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Router>
      <div className="App">
        <Navbar toggleCart={toggleCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller/:id" element={<SellerPage />} />
        </Routes>
        {/* Conditionally render the Cart component */}
        {showCart && <Cart toggleCart={toggleCart} />}
      </div>
    </Router>
  );
}

export default App;