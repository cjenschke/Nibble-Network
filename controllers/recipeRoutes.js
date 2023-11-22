// controllers/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController');

router.get('/recipe/:id', (req, res) => {
    // Mock data for a single recipe
    const recipe = {
        id: req.params.id,
        title: `Recipe Title for ID ${req.params.id}` // Example title
    };
    
    res.render('single-recipe', { recipe });
});

router.use('/recipes', recipeController);
module.exports = router;

