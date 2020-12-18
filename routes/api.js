const express = require('express');
const router = express.Router();

const countryController = require('../controllers/countryController');


const arrCountries = [];

router.get('/api', countryController.getCountries);

router.get('/apiGet', countryController.getCountries);

module.exports = router;