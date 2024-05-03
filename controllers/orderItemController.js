// orderItemController.js

const OrderItem = require('../models/OrderItem');

// Add a new order item
exports.addOrderItem = async (req, res) => {
  try {
    const { OrderID, ProductID, Quantity, UnitPrice } = req.body;
    const newOrderItem = await OrderItem.create({
      OrderID,
      ProductID,
      Quantity,
      UnitPrice
    });
    res.status(201).json({ message: 'Order item added successfully', orderItem: newOrderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing order item
exports.updateOrderItem = async (req, res) => {
  try {
    const { OrderID, ProductID, Quantity, UnitPrice } = req.body;
    const orderItemId = req.params.orderItemId;
    const updatedOrderItem = await OrderItem.update(
      { OrderID, ProductID, Quantity, UnitPrice },
      { where: { id: orderItemId } }
    );
    res.status(200).json({ message: 'Order item updated successfully', orderItem: updatedOrderItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an order item
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItemId = req.params.orderItemId;
    await OrderItem.destroy({ where: { id: orderItemId } });
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get order items by OrderID
exports.getOrderItemsByOrderId = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find order items by OrderID
      const orderItems = await OrderItem.findAll({ where: { OrderID: orderId } });
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(404).json({ message: 'No order items found for the specified OrderID' });
      }
  
      res.status(200).json({ orderItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };