const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.register);
// Add other user routes if needed

module.exports = router;
