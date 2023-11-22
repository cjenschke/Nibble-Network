// controllers/resultsRoutes.js:
const express = require('express');
const router = express.Router();

router.get('/results', (req, res) => {
    res.render('results');
});

module.exports = router;
