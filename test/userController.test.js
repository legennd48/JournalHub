import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../models/User'; // Assuming your User model is defined here
import server from '../server'; // Your Express server instance

const { expect } = chai;

chai.use(chaiHttp);

describe('UserController', () => {
  // Mock user data for testing
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
  };

  // Clear User collection before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(server)
        .post('/register')
        .send(userData);

      expect(res).to.have.status(201);
      expect(res.body.user).to.have.property('id');
      expect(res.body.user.name).to.equal(userData.name);
      expect(res.body.user.email).to.equal(userData.email);
      // Add more assertions as needed
    });

    it('should return 400 if email is already in use', async () => {
      // Save a user with the same email before testing
      await User.create(userData);

      const res = await chai
        .request(server)
        .post('/register')
        .send(userData);

      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('Email already in use');
    });
  });

  describe('GET /profile', () => {
    it('should get user profile', async () => {
      // Create a user for testing
      const user = await User.create(userData);

      const res = await chai
        .request(server)
        .get('/profile')
        .set('Authorization', `Bearer ${user.generateAuthToken()}`); // Assuming you have a method to generate JWT tokens for authorization

      expect(res).to.have.status(200);
      expect(res.body.user).to.have.property('name', userData.name);
      expect(res.body.user).to.have.property('email', userData.email);
      // Add more assertions as needed
    });

    it('should return 500 on server error', async () => {
      // Mocking a server error by not providing valid JWT token
      const res = await chai
        .request(server)
        .get('/profile');

      expect(res).to.have.status(500);
      expect(res.body.error).to.equal('Internal Server Error');
    });
  });

});
