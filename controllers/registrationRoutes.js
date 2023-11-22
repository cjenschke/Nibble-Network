// controllers/registrationRoutes.js:
const express = require('express');
const passport = require('passport'); // Include passport
const router = express.Router();
const { User } = require('../models');
const { Sequelize } = require('sequelize');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const newUser = await User.create({
            username,
            email,
            password,
        });

        // Log in the new user using passport
        req.login(newUser, err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/dashboard'); // Redirect to the dashboard
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
