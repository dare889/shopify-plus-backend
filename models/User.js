const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://user:pass@localhost:5432/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Add other fields as needed
});

module.exports = User;
