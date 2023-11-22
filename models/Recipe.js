const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Recipe extends Model {}

Recipe.init(
  {
    // Your existing recipe fields
    title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    // Foreign key referencing User model
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'recipe',
    // Other option as needed
  }
);

module.exports = Recipe;
