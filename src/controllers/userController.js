// load environment variables from .env file
import dotenv from 'dotenv';
// Import bcrypt for password hashing
import bcrypt from 'bcrypt';
// Import the user model
import User from '../models/User';

// Ensure enviornment variables are loaded
dotenv.config();

// Controller to handle user operations
class UserController {
  // register a new user
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

      // create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // save the user to the database
      await user.save();

      // respond with the created user (excluding the password)
      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isPrivate: user.isPrivate,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      // find the user by ID
      const user = await User.findById(userId).select('-password');

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

      // find the user by ID and update the profile
      const user = await User.findByIdAndUpdate(
        userId,
        { name, email, isPrivate },
        { new: true },
      ).select('-password');

      // respond with the update user profile
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // delete user account
  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;

      // find the user by ID and delete the account
      await User.findByIdAndDelete(userId);

      // respond with a sucess message
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
