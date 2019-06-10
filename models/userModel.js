/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var User = schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    alias: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['admin', 'teacher'], required: true},
    state: {type: Boolean, default: true, required: true},
    createdAt: { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('User', User);