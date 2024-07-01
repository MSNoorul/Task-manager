const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as per your project structure
const User = require('./User'); // Import the User model

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  assigneeId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Task can exist without an assignee initially
    references: {
      model: User, // References the User model
      key: 'id',
    },
  },
  
});

module.exports = Task;
