// Import the User model
const User = require('../models/user');
// import bcrypt for password hashimh
const bcrypt = require('bcrypt');
// Import jwt for token generation
const jwt = require('jsonwebtoken');

// Load environment variable from .env file
require('dotenv').config();

// Controller to handle user operations
class UserController {
  // Register a new user
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // save the user to the database
      await user.save();

      // respond with the created user (excluding the password)
      res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, isPrivate: user.isPrivate } });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// User login
async login(req, res) {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get user profile
async getProfile(req, res) {
  try {
    const userId = req.user.id;

    // find the user by ID
    const user = await User.fundById(userId).select('-password');

    // respond with the user profile
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// update user profile
async updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { name, email, isPrivate } = req.body;

    // find the user by ID  and update the profile
    const user = await User.findByIdAndUpdate(userId, { name, email, isPrivate }, { new: true }).select('-password');

    // respond with the updated user profile
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete user account
async deleteAccount(req, res) {
  try {
    const userId = req.user.id;

    // find the user by ID and delete the account
    await User.findByIdAndDelete(userId);

    // respond with a success message
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
}

// Export an instance of UserController
module.exports = new UserController();
