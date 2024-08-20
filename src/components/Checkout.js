import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { auth } from './firebase'; // Import Firebase Authentication
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
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
      const response = await axios.post('http://localhost:3001/create-payment-intent', {
        amount: calculateTotal(cartItems),
        userId: user ? user.uid : null, // Include user ID if available
      });

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user ? user.displayName : 'Jenny Rosen', // Use user's name if available
            email: user ? user.email : '', // Use user's email if available
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          navigate('/success');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    
    setProcessing(false);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="contact-information">
        <h3>Contact Information</h3>
        <div className="contact-input">
          <input type="email" placeholder="Email" required defaultValue={user ? user.email : ''} />
          <input type="text" placeholder="Address" required />
          <input type="tel" placeholder="Phone Number" required />
        </div>
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