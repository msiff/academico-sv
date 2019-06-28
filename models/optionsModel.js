/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Options = schema({
    // unic: {type: Number, value: 1, unique: true},
    matricula: { type: Boolean, required: true},
    costoMatricula: {type: Number, required: true},
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Options', Options);