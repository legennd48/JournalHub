// Import mongoose to create the user schema
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  // user ID is generated automatically by MongoDB
  name: {
    type: String,
    required: true, // name is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // email must be unique
  },
  password: {
    type: String,
    required: true, // password is required
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // role can either be user ofr admin
    default: 'user', // Default role is user
  },
  isPrivate: {
    type: Boolean,
    default: false, // Default isPrivate to false
  },
}, {
  timestamps: true, // authomatically create createdat and updatedat timestamps
});

// create the user model from schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other parts of the application
module.exports = User;
