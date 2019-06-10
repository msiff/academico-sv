/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tipoModality = schema({
    type: {type: String, required: true},
    price: {type: Number, required: true},
    state: {type: Boolean, default: true, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('tipoModality', tipoModality);