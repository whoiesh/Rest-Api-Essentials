const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create an account
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create an account' });
  }
});

// Add authentication middleware (JWT) to protect other routes

module.exports = router;
