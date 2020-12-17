const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

const rootDir = require('../utils/path');
const Country = require('../models/country');

const arrCountries = [];

router.get('/api', (req, res, next) => {
    res.setHeader('content-type','application/json');
      //avoiding CORS issues
      //this says we are allowing requests from any browser from anywhere
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      Country.fetchAll((arrCountries) => {
        res.end(JSON.stringify(arrCountries));
      });
  });

  module.exports = router;