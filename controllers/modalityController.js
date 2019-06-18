/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos

//Servicios

//Modelos
var Modality = require('../models/modalityModel');

// Acciones
function addModality(req, res) {
    var newModality = new Modality();
    var params = req.body;
    // if (params.name && params.dance && params.type && params.year && params.teachers) {
    if (1) {
        newModality = ModalityReader(params);
        newModality.save((err, ModalityStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error al guardar la modalidad.",
                    type: 'err'
                });
            } else {
                if(!ModalityStored) {
                    res.status(404).send({
                        message: "No se pudo guardar la modalidad.",
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        type: "ok",
                        message: 'Registro completo! Se creo una modalidad: ' + newModality.name 
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

function getModalitys(req, res) {
    if (1) {
        Modality.find({}, (err, modalitys) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!modalitys) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay modalidades!'
                    });
                } else {
                    res.status(200).send({
                        modalitys
                    });
                }
            }
        })
        .populate('type')
        .populate('teachers');
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function updateModality (req, res) {
    var ModalityId = req.params.id;
    var params = req.body;
    if(params.name && params.dance && params.type && params.year && params.teachers) {
        Modality.findByIdAndUpdate(ModalityId, params, (err, ModalityUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar la modalidad.',
                    type: 'err'
                });
            } else {
                if (!ModalityUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar la modalidad.',
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        modality: ModalityUpdated
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

function deleteModality(req, res) {
    // hay que crearla teniendo en cuenta los documentos que hacen referencia a el.
}

// Obtiene las modalidades activas
function getModalitysActive(req, res) {
    if (1) {
        Modality.find({state: true}, (err, modalitys) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!modalitys) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay modalidades activas!'
                    });
                } else {
                    res.status(200).send({
                        modalitys
                    });
                }
            }
        })
        .populate('type')
        .populate('teachers');
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function ModalityReader(params) {
    var newModality = new Modality();
    newModality.name = params.name;
    newModality.dance = params.dance;
    newModality.type = params.type;
    newModality.year = params.year;
    newModality.state = params.state;
    newModality.teachers = params.teachers;
    return newModality;
}

// export
module.exports = { addModality, getModalitys, updateModality, deleteModality, getModalitysActive };