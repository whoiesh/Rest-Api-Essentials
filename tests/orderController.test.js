const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const Service = require('../models/service');
const Cart = require('../models/cart');

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany();
  await Product.deleteMany();
  await Service.deleteMany();
  await Cart.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Order Controller', () => {
  it('should confirm the order', async () => {
    // Create a sample user in the database
    const user = await User.create({ username: 'testuser', password: 'testpassword' });

    // Create sample products and services in the database
    await Product.create({ name: 'Product A', price: 1000 });
    await Service.create({ name: 'Service A', price: 1500 });

    // Add products and services to the user's cart
    await Cart.create({
      user: user._id,
      items: [
        { type: 'product', item: 'product_id_1', quantity: 2 },
        { type: 'service', item: 'service_id_1', quantity: 3 },
      ],
    });

    const response = await request(app)
      .post('/cart/confirmOrder')
      .set('Authorization', `Bearer ${user.generateAuthToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order confirmed successfully');

    // Ensure the cart is empty after confirming the order
    // Add assertions here
  });

  // Add more test cases for other endpoints in orderController
});
