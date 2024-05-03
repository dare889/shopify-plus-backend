// userController.js
const User = require('../models/User');

// Controller for user operations
const userController = {
  // Register a new user
  register: async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password, firstname, lastname } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Create a new user in the database
        const newUser = await User.create({
          username,
          email,
          password,
          firstname,
          lastname,
        });
    
        // Return success message
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Fetch user profile
  getProfile: async (req, res) => {
    try {
      // Fetch user profile based on user ID
      const user = await User.findByPk(req.params.userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user profile
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update user information
  updateProfile: async (req, res) => {
    try {
      // Extract updated user data from request body
      const { username, email, firstname, lastname } = req.body;

      // Find the user by ID
      const user = await User.findByPk(req.params.userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user information
      user.username = username;
      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;

      // Save the updated user data
      await user.save();

      // Return success message
      res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete user account
  deleteAccount: async (req, res) => {
    try {
      // Find the user by ID
      const user = await User.findByPk(req.params.userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user account
      await user.destroy();

      // Return success message
      res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
