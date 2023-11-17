const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredients');
const User = require('../models/User');
router.post('/save-ingredient', async (req, res) => {
  const { userEmail, ingredientName } = req.body;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newIngredient = await Ingredient.create({
      name: ingredientName,
      UserId: user.id, // Associate with user
    });
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
