// controllers/api/ingredientsSearch.js:
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

router.get('/find-recipes', async (req, res) => {
  const ingredients = req.query.ingredients;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&ranking=1&number=5`
    );
    const formattedRecipes = response.data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: recipe.usedIngredientCount,
      missedIngredientCount: recipe.missedIngredientCount,
    }));
    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server error');
  }
});

// New route for getting detailed recipe information
router.get('/recipe-details/:id', async (req, res) => {
  const recipeId = req.params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    res.json({ url: response.data.sourceUrl });
  } catch (error) {
    console.error(
      `Error fetching recipe details for recipe ${recipeId}:`,
      error
    );
    res.status(500).send('Server error');
  }
});
module.exports = router;
