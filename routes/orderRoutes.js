const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order routes
router.get('/admin', orderController.viewAllOrders); // Admin route to view all orders
router.get('/', orderController.viewUserOrders); // User route to view their orders
// Add other order routes if needed

module.exports = router;
