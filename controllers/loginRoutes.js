// controllers/loginRoutes.js:
const express = require('express');
const passport = require('passport'); // Include passport
const router = express.Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard'); // Redirect to dashboard if already logged in
    }

    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to the dashboard upon successful login
    failureRedirect: '/login', // Redirect back to login page on failure
    failureFlash: true // Optional, for displaying flash messages
}));

module.exports = router;
