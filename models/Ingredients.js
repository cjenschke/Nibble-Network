const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // If you plan to associate ingredients with users
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
});
module.exports = Ingredient;
