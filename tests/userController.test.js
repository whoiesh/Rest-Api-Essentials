const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Account created successfully');
  });

  it('should not create a new user with duplicate username', async () => {
    // Create a user with the same username
    await User.create({ username: 'existinguser', password: 'testpassword' });

    const response = await request(app)
      .post('/users/register')
      .send({ username: 'existinguser', password: 'newpassword' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to create an account');
  });

  // Add more test cases for other endpoints in userController
});
