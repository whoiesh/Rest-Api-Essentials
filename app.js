const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// API routes
app.use('/users', userController);
app.use('/products', productController);
app.use('/services', serviceController);

// Protected routes (require authentication)
app.use('/cart', authenticateUser, cartController);
app.use('/orders', authenticateUser, orderController);

// Connect to the database
mongoose.connect('mongodb://localhost/billing_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = app;
