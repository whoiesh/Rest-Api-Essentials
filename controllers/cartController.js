const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// View total bill
router.get('/viewBill', async (req, res) => {
  try {
    // Fetch the user's cart details
    // Calculate the total bill (including price, quantity, and tax on each item)
    res.json({ totalBill });
  } catch (err) {
    res.status(500).json({ error: 'Failed to view the total bill' });
  }
});

// Confirm the order
router.post('/confirmOrder', async (req, res) => {
  try {
    // Validate input (e.g., check if the cart is not empty)
    // Create an order with cart details
    // Empty the user's cart
    res.json({ message: 'Order confirmed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm the order' });
  }
});

// Additional API for admin to see all the orders
router.get('/admin/orders', async (req, res) => {
  try {
    // Add authentication middleware (JWT) to ensure only admins can access this route
    // Fetch all orders from the database
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
