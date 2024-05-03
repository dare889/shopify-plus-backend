// cartController.js

const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  try {
    // Extract cart item data from request body
    const { UserID, ProductID, Quantity } = req.body;

    // Create a new cart item in the database
    const newCartItem = await CartItem.create({
        UserID,
        ProductID,
        Quantity
    });

    res.status(201).json({ message: 'Item added to cart successfully', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const { Quantity } = req.body;
  
      // Find the cart item by ID and update its quantity
      const updatedCartItem = await CartItem.findByPk(cartItemId);
      if (!updatedCartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      updatedCartItem.Quantity = Quantity;
      await updatedCartItem.save();
  
      res.status(200).json({ message: 'Cart item updated successfully', cartItem: updatedCartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Remove item from cart
  exports.removeFromCart = async (req, res) => {
    try {
      const { cartItemId } = req.params;
  
      // Find the cart item by ID and delete it
      const deletedCartItem = await CartItem.findByPk(cartItemId);
      if (!deletedCartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      await deletedCartItem.destroy();
  
      res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getCartByUserId = async (req, res) => {
    try {
      const UserID = req.params.userId;
  
      // Fetch cart items for the specified user
      const cartItems = await CartItem.findAll({ where: { UserID } });
  
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };