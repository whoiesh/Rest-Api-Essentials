const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Service = require('../models/service');

// Clear the database before each test
beforeEach(async () => {
  await Service.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Service Controller', () => {
  it('should fetch all services', async () => {
    // Create sample services in the database
    await Service.create([
      { name: 'Service A', price: 1500 },
      { name: 'Service B', price: 3000 },
      { name: 'Service C', price: 6000 },
    ]);

    const response = await request(app).get('/services');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].name).toBe('Service A');
    expect(response.body[1].name).toBe('Service B');
    expect(response.body[2].name).toBe('Service C');
  });

  it('should add a service to the cart', async () => {
    // Create a sample service in the database
    const service = await Service.create({ name: 'Sample Service', price: 2000 });

    const response = await request(app)
      .post('/services/addToCart')
      .send({ serviceId: service._id, quantity: 3 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Service added to cart successfully');

    // Ensure the cart contains the added service
    // Add assertions here
  });

  // Add more test cases for other endpoints in serviceController
});
