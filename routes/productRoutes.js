const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product routes
router.get('/', productController.getAllProducts);
router.post('/addToCart', productController.addToCart);
router.post('/removeFromCart', productController.removeFromCart);
router.post('/clearCart', productController.clearCart);
// Add other product routes if needed

module.exports = router;
