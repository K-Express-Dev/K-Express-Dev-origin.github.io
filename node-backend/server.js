const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');
const { OAuth2Client } = require('google-auth-library');
const stripe = require('stripe')('pk_test_51PirtbLEiREtRO6CGONL8gaCUqN1lfFdOc7ySIO0iFqPWIa6n32BIWQNAKSaj6Woo5hhneLxq3xpCUCTdn2UKFxO00dM0Yoa8Y');

dotenv.config();

const app = express();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// Existing Stripe payment intent route
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}'
  });

  res.send({clientSecret: session.client_secret});
});

// New Google authentication route
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    
    // Here, you would typically:
    // 1. Check if the user exists in your database
    // 2. If not, create a new user
    // 3. Generate a session token or JWT for your app

    // For this example, we're just sending back some user info
    res.json({ 
      userId, 
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));