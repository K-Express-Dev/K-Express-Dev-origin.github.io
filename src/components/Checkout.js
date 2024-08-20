import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { auth } from './firebase'; // Import Firebase Authentication
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/create-checkout-session', {
        cartItems,
        userId: user ? user.uid : null, // Include user ID if available
      });

      const { id } = response.data;

      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error(error);
        setError(error.message);
        setProcessing(false);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="billing-details">
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="card-information">
        <h3>Card Information</h3>
        <div className="card-input">
          <CardElement />
        </div>
        <div className="billing-info">
          <input type="checkbox" id="same-as-shipping" />
          <label htmlFor="same-as-shipping">Billing info is same as shipping</label>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" className="pay-button" disabled={!stripe || processing}>
        {processing ? 'Processing...' : `Pay $${calculateTotal(cartItems)}`}
      </button>
    </form>
  );
}

function Checkout() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-summary">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} />
      </Elements>
    </div>
  );
}

export default Checkout;