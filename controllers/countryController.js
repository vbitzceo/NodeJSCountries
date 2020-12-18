const express = require('express');
const router = express.Router();

const Country = require('../models/country');

exports.getCountries = (req, res, next) => {
    res.setHeader('content-type','application/json');
      //avoiding CORS issues
      //this says we are allowing requests from any browser from anywhere
    res.setHeader('Access-Control-Allow-Origin', '*');

    Country.fetchAll((err, arrCountries) => {
    if (err === null)
      res.end(JSON.stringify(arrCountries));
    });
};