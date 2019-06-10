/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Father = schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    phone1: {type: String, required: true},
    phone2: {type: String, required: false},
    adress: {type: String, required: true},
    details: {type: String, required: false},
    createdAt: { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Father', Father);