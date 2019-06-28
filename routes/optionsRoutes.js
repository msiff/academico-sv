/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var api = express.Router();

// Controller
var optionsController = require('../controllers/optionsController');

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/addOptions', midAuth.ensureAuth, optionsController.addOptions);
api.get('/getOptions', midAuth.ensureAuth, optionsController.getOptions);
api.put('/updateOptions/:id', midAuth.ensureAuth, optionsController.updateOptions);

module.exports = api;