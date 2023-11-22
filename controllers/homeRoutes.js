// controllers/homeRoutes.js:
const express = require('express');
const router = express.Router();
const getRandomRecipes = require('../controllers/api/homepageRecipes');

// Define a route for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch two random recipes
    const recipes = await getRandomRecipes();

    // Fetch two random recipes
    // res.render = await getRandomRecipes();

    // Render your homepage and pass the recipes data to your template engine
    res.render('homepage', { recipes });
  } catch (error) {
    console.error('Error rendering homepage:', error);
    res.status(500).send('Error rendering homepage');
  }
});

// Login page route
router.get('/login', (req, res) => {
  res.render('login');
});

// Registration page route
router.get('/registration', (req, res) => {
  res.render('registration');
});

module.exports = router;
