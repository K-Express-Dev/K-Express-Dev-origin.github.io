const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const stripe = require('stripe');

dotenv.config();

const app = express();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (cartItems) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const fees = subtotal * 0.01; // 1% fee
  const taxRate = 0.0775; // 8% tax rate (you may want to make this dynamic based on location)
  const taxes = subtotal * taxRate;
  const total = subtotal + fees + taxes;

  return {
    subtotal: Math.round(subtotal * 100),
    fees: Math.round(fees * 100),
    taxes: Math.round(taxes * 100),
    total: Math.round(total * 100)
  };
};

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  console.log('Received cart items:', cartItems);

  const { subtotal, fees, taxes, total } = calculateOrderAmount(cartItems);

  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // Add fees and taxes as separate line items
  lineItems.push(
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'Fees' },
        unit_amount: fees,
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'Taxes' },
        unit_amount: taxes,
      },
      quantity: 1,
    }
  );

  console.log('Generated line items:', lineItems);

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    console.log('Checkout session created:', session);

    res.json({ 
      id: session.id,
      subtotal,
      fees,
      taxes,
      total
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Stripe Secret Key: ${process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Not Loaded'}`);
  console.log(`Google Client ID: ${process.env.GOOGLE_CLIENT_ID ? 'Loaded' : 'Not Loaded'}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
});