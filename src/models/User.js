// Import mongoose to create the user schema
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema(
  {
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
  },
  {
    timestamps: true, // authomatically create createdat and updatedat timestamps
  },
);

// Middleware to hash the password befor saving
userSchema.pre('save', async function hashedPassword(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPwd = await bcrypt.hash(this.password, 10);
    this.password = hashedPwd;
    next();
  } catch (err) {
    next(err);
  }
});

// create the user model from schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other parts of the application
export default User;
