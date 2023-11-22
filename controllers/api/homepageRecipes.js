const axios = require('axios');
require('dotenv').config();

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;
const spoonacularEndpoint = `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}&number=2`;

async function getRandomRecipes() {
  try {
    const response = await axios.get(spoonacularEndpoint);
    const recipesData = response.data.recipes;

    // Extract the desired properties (title, image, and sourceUrl) from each recipe
    const recipes = recipesData.map((recipe) => ({
      title: recipe.title,
      image: recipe.image,
      sourceUrl: recipe.sourceUrl,
    }));

    return recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
}

module.exports = getRandomRecipes;
