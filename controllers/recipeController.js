const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipes = require('../models/UserRecipes'); // Add this line to import UserRecipes

// route to save a recipe with ingredients
router.post('/save-recipe', async (req, res) => {
    const { userEmail, recipeName, selectedIngredients } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Save the recipe with the user's ID
        const savedRecipe = await Recipe.create({
            name: recipeName,
            UserId: user.id,
        });

        // Associate selected ingredients with the recipe
        await savedRecipe.addIngredients(selectedIngredients);

        // Log the saved recipe in the UserRecipes table
        await UserRecipes.create({
            UserId: user.id,
            RecipeId: savedRecipe.id,
            actionType: 'Save',
        });

        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

