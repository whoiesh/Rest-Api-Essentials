const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');

// View all orders (for admin)
router.get('/admin', async (req, res) => {
  try {
    // Validate if the current user is an admin (you can define a role field in the User model)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to access this endpoint' });
    }

    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// View all orders for the current user
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Add your other order-related endpoints here

module.exports = router;
