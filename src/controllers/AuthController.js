import bcrypt from 'bcryptjs';
import { generateToken, blacklistToken } from '../utils/jwt';
import dbClient from '../utils/db';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await dbClient.db.collection('users').findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async logout(req, res) {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await blacklistToken(token, expiresIn);
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();
