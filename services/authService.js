// authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

// Function to generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Function to register a new user
exports.registerUser = async (userData) => {
  const { username, email, password, firstName, lastName } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  return newUser;
};

// Function to authenticate user login
exports.authenticateUser = async (email, password) => {
  // Check if the user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Validate password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = this.generateToken(user.id);

  return { token, user };
};
