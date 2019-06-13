/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var api = express.Router();

// Controller
var modalityController = require('../controllers/modalityController');

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/addModality', midAuth.ensureAuth, modalityController.addModality);
api.get('/getModalitys', midAuth.ensureAuth, modalityController.getModalitys);
api.put('/updateModality/:id', midAuth.ensureAuth, modalityController.updateModality);
api.delete('/deleteModality/:id', midAuth.ensureAuth, modalityController.deleteModality);
api.get('/getModalitysActive', midAuth.ensureAuth, modalityController.getModalitysActive);
//api.get('/get-solicitudes',midAuth.ensureAuth, adminController.getSolicitudes);
//api.post('/new-owner/:id',midAuth.ensureAuth, adminController.newOwner);

module.exports = api;