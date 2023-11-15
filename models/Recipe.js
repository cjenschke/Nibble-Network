const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Recipe = sequelize.define('Recipe', {
  // Define your Recipe model attributes here
  // For example:
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Recipe.belongsToMany(Ingredient, { through: 'RecipeIngredient' });

module.exports = Recipe;
