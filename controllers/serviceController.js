const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Fetch all services information with their prices
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Add a service to the cart
router.post('/addToCart', async (req, res) => {
  try {
    // Validate input (e.g., check if service exists and quantity is valid)
    // Add the service to the user's cart
    // Update cart total and tax accordingly
    res.json({ message: 'Service added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service to cart' });
  }
});

// Remove a service from the cart
router.post('/removeFromCart', async (req, res) => {
  try {
    // Validate input (e.g., check if service exists in the cart)
    // Remove the service from the user's cart
    // Update cart total and tax accordingly
    res.json({ message: 'Service removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove service from cart' });
  }
});

// Clear the cart
router.post('/clearCart', async (req, res) => {
  try {
    // Clear the user's cart
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
