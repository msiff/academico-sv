/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var fatherController = require('../controllers/fatherController');
var api = express.Router();

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/addFather', midAuth.ensureAuth, fatherController.addFather);
api.get('/getFathers', midAuth.ensureAuth, fatherController.getFathers);
api.put('/updateFather/:id', midAuth.ensureAuth, fatherController.updateFather);
api.delete('/deleteFather/:id', midAuth.ensureAuth, fatherController.deleteFather);
api.get('/getHijosPorId/:id', midAuth.ensureAuth, fatherController.getHijosPorId);
//api.post('/new-owner/:id',midAuth.ensureAuth, adminController.newOwner);

module.exports = api;