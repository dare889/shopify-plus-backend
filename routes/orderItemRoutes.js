// orderItemRoutes.js

const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Route to add a new order item
router.post('/', orderItemController.addOrderItem);

// Route to update an existing order item
router.put('/:orderItemId', orderItemController.updateOrderItem);

// Route to delete an order item
router.delete('/:orderItemId', orderItemController.deleteOrderItem);

// Route to get order items by OrderID
router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);

module.exports = router;
