/* jshint -W097, -W117, -W119 */
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Modality = schema({
    name: {type: String, required: true},
    dance: { type: String, enum: 
        [
            'Infantil',
            'Jazz', 
            'Arabe',
            'Clasico',
            'Ritmos Latinos'
        ], 
        required: true},
    type:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tipoModality' },
    year:{type: Date, required: true},
    state: {type: Boolean, default: true, required: true},
    teachers: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }],
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Modality', Modality);