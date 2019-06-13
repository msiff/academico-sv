/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos

//Servicios

//Modelos
var tipoModality = require('../models/tipoModalityModel');

// Acciones
function addtipoModality(req, res) {
    var newTipoModality = new tipoModality();
    var params = req.body;
    if (params.type && params.price) {
        newTipoModality = tipoModalityReader(params);
        newTipoModality.save((err, tipoModalityStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error al guardar el tipo de modalidad.",
                    type: 'err'
                });
            } else {
                if(!tipoModalityStored) {
                    res.status(404).send({
                        message: "Error al guardar el tipo de modalidad.",
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        type: "ok",
                        message: 'Registro completo! Se creo un tipo: ' + newTipoModality.type 
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: "Introduce los datos correctamente",
            type: 'err'
        });
    }
}

function gettipoModalitys(req, res) {
    if (1) {
        tipoModality.find({}, (err, tipoModalitys) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!tipoModalitys) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay tipos de modalidad!'
                    });
                } else {
                    res.status(200).send({
                        tipoModalitys
                    });
                }
            }
        });
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function getTipoModalitysActive(req, res) {
    if (1) {
        tipoModality.find({state: true}, (err, tipoModalitys) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!tipoModalitys) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay tipos de modalidad!'
                    });
                } else {
                    res.status(200).send({
                        tipoModalitys
                    });
                }
            }
        });
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function updateTipoModality (req, res) {
    var tipoModalityId = req.params.id;
    var params = req.body;
    if(params.type && params.price) {
        tipoModality.findByIdAndUpdate(tipoModalityId, params, (err, tipoModalityUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar el tipo de modalidad.',
                    type: 'err'
                });
            } else {
                if (!tipoModalityUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar el tipo de modalidad.',
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        tipoModality: tipoModalityUpdated
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: "Introduce los datos correctamente",
            type: 'err'
        });
    }
}

function deleteTipoModality(req, res) {
    // hay que crearla teniendo en cuenta los documentos que hacen referencia a el.
}

function tipoModalityReader(params) {
    var newTipoModality = new tipoModality();
    newTipoModality.type = params.type;
    newTipoModality.price = params.price;
    newTipoModality.state = params.state;
    return newTipoModality;
}

// export
module.exports = { addtipoModality, gettipoModalitys, updateTipoModality, deleteTipoModality, getTipoModalitysActive };
