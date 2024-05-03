const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user operations
router.post('/register', userController.register); // Register a new user
router.get('/:userId', userController.getProfile); // Fetch user profile
router.put('/:userId', userController.updateProfile); // Update user information
router.delete('/:userId', userController.deleteAccount); // Delete user account

module.exports = router;
