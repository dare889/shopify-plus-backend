// app.js
require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const cartRoutes = require('./routes/cartRoutes');

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/products', productRoutes); // Product routes
app.use('/orders', orderRoutes); // Order routes
app.use('/orderItem', orderItemRoutes); 
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Enable Sequelize logging
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Enable Sequelize logging for queries
sequelize.sync({ logging: console.log })
  .then(() => {
    console.log('Database synchronized');
  });
