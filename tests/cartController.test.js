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

describe('Cart Controller', () => {
  it('should view the total bill', async () => {
    // Create a sample user in the database
    const user = await User.create({ username: 'testuser', password: 'testpassword' });

    // Create sample products and services in the database
    await Product.create({ name: 'Product A', price: 1000 });
    await Product.create({ name: 'Product B', price: 2000 });
    await Service.create({ name: 'Service A', price: 1500 });

    // Add products and services to the user's cart
    await Cart.create({
      user: user._id,
      items: [
        { type: 'product', item: 'product_id_1', quantity: 2 },
        { type: 'product', item: 'product_id_2', quantity: 1 },
        { type: 'service', item: 'service_id_1', quantity: 3 },
      ],
    });

    const response = await request(app).get('/cart/viewBill').set('Authorization', `Bearer ${user.generateAuthToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.totalBill).toBe(7500); // Assuming tax is not applied in this test
  });

  // Add more test cases for other endpoints in cartController
});
