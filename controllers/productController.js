const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Fetch all products information with their prices
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a product to the cart
router.post('/addToCart', async (req, res) => {
  try {
    // Validate input (e.g., check if product exists and quantity is valid)
    // Add the product to the user's cart
    // Update cart total and tax accordingly
    res.json({ message: 'Product added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

// Remove a product from the cart
router.post('/removeFromCart', async (req, res) => {
  try {
    // Validate input (e.g., check if product exists in the cart)
    // Remove the product from the user's cart
    // Update cart total and tax accordingly
    res.json({ message: 'Product removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
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
