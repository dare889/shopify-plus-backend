// config/database.js

const { Sequelize } = require('sequelize');
const config = require('./config');

// Extract database configuration based on environment
const { database } = config[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect,
});

module.exports = sequelize;
