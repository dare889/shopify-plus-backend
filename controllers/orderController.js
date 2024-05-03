// orderController.js

const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { UserID, TotalAmount, OrderStatus } = req.body;

    const newOrder = await Order.create({
      UserID,
      TotalAmount,
      OrderStatus
    });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
