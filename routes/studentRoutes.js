/* jshint -W097, -W117, -W119, -W104 */
'use strict';
var express = require('express');
var studentController = require('../controllers/studentController');
var api = express.Router();

// Middlewares
var midAuth = require('../middlewares/authenticated');

// Rutas
api.post('/addStudent', midAuth.ensureAuth, studentController.addStudent);
api.get('/getStudents', midAuth.ensureAuth, studentController.getStudents);
api.put('/updateStudent/:id', midAuth.ensureAuth, studentController.updateStudent);
api.get('/getStudentsActive', midAuth.ensureAuth, studentController.getStudentsActive);
api.get('/countStudents', studentController.studentsCount);
//api.get('/get-solicitudes',midAuth.ensureAuth, adminController.getSolicitudes);
//api.post('/new-owner/:id',midAuth.ensureAuth, adminController.newOwner);

module.exports = api;