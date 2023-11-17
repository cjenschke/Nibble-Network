const express = require('express');
const router = express.Router();
const { UserRecipes, Recipes } = require('../models'); // Import your Sequelize models

// Dashboard page route
router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have a user object in the request

        // Use Sequelize to fetch user's saved recipes
        const savedRecipes = await UserRecipes.findAll({
            where: {
                UserID: userId,
            },
            include: [{
                model: Recipes,
                attributes: ['Title', 'URL'],
            }],
        });

        // Extract the recipe data for rendering
        const favoriteRecipes = savedRecipes.map(recipe => {
            return {
                id: recipe.Recipe.id,
                title: recipe.Recipe.Title,
                url: recipe.Recipe.URL,
            };
        });

        // Render the dashboard with the retrieved recipes
        res.render('dashboard', { favoriteRecipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle saving a recipe
router.post('/save-recipe/:recipeId', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have a user object in the request
        const { recipeId } = req.params;

        // Use Sequelize to create a new UserRecipe entry
        await UserRecipes.create({
            UserID: userId,
            RecipeID: recipeId,
        });

        res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ message: 'Failed to save recipe' });
    }
});


module.exports = router;


