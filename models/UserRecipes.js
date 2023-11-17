// models/UserRecipe.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserRecipe extends Model {}

UserRecipe.init(
  {
    userRecipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Foreign keys for associations
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Assuming your user model is named 'User'
        key: 'userId',
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'recipeId',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userRecipe',
  }
);

module.exports = UserRecipe;

