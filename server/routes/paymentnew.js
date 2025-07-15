const express = require('express');
const Stripe = require('stripe');
const paymentnewrouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentnewrouter.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : []
        },
        unit_amount: (item.price + 4) * 100 // 4 is platform fee in ₹
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://picksy-frontend.vercel.app/successpage',
      cancel_url: 'https://picksy-frontend.vercel.app/cancel'
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: 'Checkout session creation failed' });
  }
});

module.exports = paymentnewrouter;
