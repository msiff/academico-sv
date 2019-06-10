/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos

//Servicios

//Modelos
var Father = require('../models/fatherModel');
var Student = require('../models/studentModel');

// Acciones
function addFather(req, res) {
    var father = new Father();
    var params = req.body;
    if (params.name && params.surname && params.phone1 && params.adress) {
        father = fatherReader(params);
        father.save((err, fatherStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error al guardar el padre",
                    type: 'err'
                });
            } else {
                if (!fatherStored) {
                    res.status(404).send({
                        message: "Error al guardar el padre",
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        type: "ok",
                        message: 'Registro completo! Se creo un nuevo padre: ' + father.name + ' ' + father.surname + '.'
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

function getFathers(req, res) {
    if (1) {
        Father.find({}, (err, fathers) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!fathers) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay padres!'
                    });
                } else {
                    res.status(200).send({
                        fathers
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

function updateFather(req, res) {
    var fatherId = req.params.id;
    var params = req.body;
    if (params.name && params.surname && params.phone1 && params.adress) {
        Father.findByIdAndUpdate(fatherId, params, (err, fatherUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar el padre',
                    type: 'err'
                });
            } else {
                if (!fatherUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar el padre',
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        father: fatherUpdated
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

function deleteFather(req, res) {
    // Esta funcion primero comprueba si el padre no tiene hijo, de ser asi se elimina.
    var fatherId = req.params.id;
    Student.findOne({ father: fatherId }, (err, student) => {
        if (err) {
            res.status(500).send({
                message: 'Error al intentar eliminar el padre!',
                type: 'err'
            });
        } else {
            if (!student) {
                // Si no encuentra estudiante con el id del padre que se quiere eliminar, se puede eliminar
                Father.findByIdAndDelete(fatherId, (err, fatherDeleted) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al intentar eliminar el padre',
                            type: 'err'
                        });
                    } else {
                        if (!fatherDeleted) {
                            res.status(500).send({
                                message: 'Error al intentar eliminar el padre',
                                type: 'err'
                            });
                        } else {
                            res.status(200).send({
                                fatherDeleted,
                                message: 'Se elimino correctamente al padre: ' + fatherDeleted.name,
                                type: 'ok'
                            });
                        }
                    }
                });
            } else {
                res.status(500).send({
                    message: 'No se puede eliminar al padre porque tiene un hijo registrado',
                    type: 'err'
                });
            }
        }
    });
}

function getHijosPorId(req, res) {
    var fatherId = req.params.id;
    Student.find({ father: fatherId}, (err, hijos) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener hijos',
                type: 'danger'
            });
        } else {
            if (!hijos) {
                res.status(404).send({
                    message: 'No se pudo obtener hijos',
                    type: 'danger'
                });
            } else {
                res.status(200).send({
                    hijos
                });
            }
        }
    });
}

function fatherReader(params) {
    var father = new Father();
    father.name = params.name;
    father.surname = params.surname;
    father.phone1 = params.phone1;
    father.phone2 = params.phone2;
    father.adress = params.adress;
    father.details = params.details;
    return father;
}

// export
module.exports = { addFather, getFathers, updateFather, deleteFather, getHijosPorId };
