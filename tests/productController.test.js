const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/product');

// Clear the database before each test
beforeEach(async () => {
  await Product.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Product Controller', () => {
  it('should fetch all products', async () => {
    // Create sample products in the database
    await Product.create([
      { name: 'Product A', price: 1000 },
      { name: 'Product B', price: 2000 },
      { name: 'Product C', price: 3000 },
    ]);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].name).toBe('Product A');
    expect(response.body[1].name).toBe('Product B');
    expect(response.body[2].name).toBe('Product C');
  });

  it('should add a product to the cart', async () => {
    // Create a sample product in the database
    const product = await Product.create({ name: 'Sample Product', price: 1000 });

    const response = await request(app)
      .post('/products/addToCart')
      .send({ productId: product._id, quantity: 2 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product added to cart successfully');

    // Ensure the cart contains the added product
    // Add assertions here
  });

  // Add more test cases for other endpoints in productController
});
