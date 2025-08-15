const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart routes
router.get('/viewBill', cartController.viewBill);
router.post('/confirmOrder', cartController.confirmOrder);
// Add other cart routes if needed

module.exports = router;
