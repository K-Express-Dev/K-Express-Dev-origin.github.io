import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { auth } from './firebase';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);
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
        userId: user ? user.uid : null,
      });
  
      const { id, subtotal, fees, taxes, total } = response.data;
      
      setOrderSummary({ subtotal, fees, taxes, total });
  
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error('Stripe redirectToCheckout error:', error);
        setError(error.message);
        setProcessing(false);
      }
    } catch (error) {
      console.error('Axios post error:', error);
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {orderSummary && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: ${(orderSummary.subtotal / 100).toFixed(2)}</p>
          <p>Fees: ${(orderSummary.fees / 100).toFixed(2)}</p>
          <p>Taxes: ${(orderSummary.taxes / 100).toFixed(2)}</p>
          <p><strong>Total: ${(orderSummary.total / 100).toFixed(2)}</strong></p>
        </div>
      )}
      <button type="submit" className="pay-button" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Proceed to Payment'}
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
        <h3>Items in Cart</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-summary">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity}</span>
          </div>
        ))}
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} />
      </Elements>
    </div>
  );
}

export default Checkout;