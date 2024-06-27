import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../src/models/user';
import server from '../src/server';

const { expect } = chai;
chai.use(chaiHttp);

describe('UserController', () => {
  before(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await chai.request(server)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      expect(res).to.have.status(201);
      expect(res.body.user).to.have.property('id');
      expect(res.body.user).to.have.property('name', 'John Doe');
      expect(res.body.user).to.have.property('email', 'john@example.com');
    });

    it('should not register a user with an existing email', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      await user.save();

      const res = await chai.request(server)
        .post('/register')
        .send({
          name: 'Jane Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Email already in use');
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      });
      await user.save();
    });

    it('should login a user with valid credentials', async () => {
      const res = await chai.request(server)
        .post('/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });

    it('should not login a user with invalid email', async () => {
      const res = await chai.request(server)
        .post('/login')
        .send({
          email: 'jane@example.com',
          password: 'password123',
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Invalid email or password');
    });

    it('should not login a user with invalid password', async () => {
      const res = await chai.request(server)
        .post('/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Invalid email or password');
    });
  });

  describe('GET /profile', () => {
    let token;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      });
      await user.save();

      token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should get the user profile with valid token', async () => {
      const res = await chai.request(server)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.user).to.have.property('id');
      expect(res.body.user).to.have.property('name', 'John Doe');
      expect(res.body.user).to.have.property('email', 'john@example.com');
    });

    it('should not get the user profile with invalid token', async () => {
      const res = await chai.request(server)
        .get('/profile')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error', 'Unauthorized');
    });
  });
});

