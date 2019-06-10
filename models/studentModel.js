/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Student = schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: Date, required: true},
    phone: {type: String, required: false},
    details: {type: String, required: false},
    father: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Father' },
    state: {type: Boolean, default: true, required: true},
    gender: { type: String, enum: ['Masculino', 'Femenino'], required: true},
    createdAt: { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Student', Student);