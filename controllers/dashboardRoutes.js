// controllers/dashboardRoutes.js:
const express = require('express');
const findRecipesByIngredients = require('../controllers/api/ingredientsSearch');

const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Define a route to search for recipes by ingredients
router.post('/search', async (req, res) => {
  try {
    // Extract selected ingredients from the request body
    const { selectedIngredients } = req.body;

    // Check if selectedIngredients is provided, and convert to array if necessary
    const ingredientArray = Array.isArray(selectedIngredients)
      ? selectedIngredients
      : [];

    // Call findRecipesByIngredients with the ingredient array
    const recipes = await findRecipesByIngredients(ingredientArray);

    // Render the 'dashboard' view with the found recipes
    // or handle the response as needed
    res.json({ recipes });
  } catch (err) {
    console.error('Error in search route:', err);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

// Dashboard page route with authentication check
router.get('/dashboard', isAuthenticated, (req, res) => {
    // Mock data for favoriteRecipes for testing purposes
    const favoriteRecipes = [
        { id: 421, title: 'Cream of Goat Hair' },
        { id: 754, title: 'Uncooked Wheat Chaff in Lukewarm Water' },
        { id: 632, title: 'Cricket Heads in Squid Ink' },
        // ... more mock recipes
    ];

    res.render('dashboard', { favoriteRecipes });
});

module.exports = router;

