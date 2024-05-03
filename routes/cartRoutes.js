// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/', cartController.addToCart);

// Route to update a cart item
router.put('/:cartItemId', cartController.updateCartItem);

// Route to remove an item from the cart
router.delete('/:cartItemId', cartController.removeFromCart);

// Route to get cart items by userId
router.get('/user/:userId', cartController.getCartByUserId);

module.exports = router;
