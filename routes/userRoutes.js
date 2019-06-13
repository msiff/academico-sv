/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var userController = require('../controllers/userController');
var api = express.Router();

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/registrarUser', userController.registrarUser);
api.post('/loginUser', userController.loginUser);
api.get('/getUsers',midAuth.ensureAuth, userController.getUsers);
api.put('/updateUser/:id', midAuth.ensureAuth, userController.updateUser);
api.get('/getUsersActive',midAuth.ensureAuth, userController.getUsersActive);
//api.get('/get-solicitudes',midAuth.ensureAuth, adminController.getSolicitudes);
//api.post('/new-owner/:id',midAuth.ensureAuth, adminController.newOwner);

module.exports = api;