/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var tipoModalityController = require('../controllers/tipoModalityController');
var api = express.Router();

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/addTipoModality', midAuth.ensureAuth, tipoModalityController.addtipoModality);
api.get('/getTipoModalitys', midAuth.ensureAuth, tipoModalityController.gettipoModalitys);
api.put('/updateTipoModality/:id', midAuth.ensureAuth, tipoModalityController.updateTipoModality);
api.delete('/deleteTipoModality/:id', midAuth.ensureAuth, tipoModalityController.deleteTipoModality);
api.get('/getTipoModalitysActive', midAuth.ensureAuth, tipoModalityController.getTipoModalitysActive);
//api.get('/get-solicitudes',midAuth.ensureAuth, adminController.getSolicitudes);
//api.post('/new-owner/:id',midAuth.ensureAuth, adminController.newOwner);

module.exports = api;