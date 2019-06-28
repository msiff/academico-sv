/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos

//Servicios

//Modelos
var Options = require('../models/optionsModel');

// Acciones
function addOptions(req, res) {
    var newOptions = new Options();
    var params = req.body;
    if (req.user.role == 'admin') {
        // Solo dejo agregar si la matricula es true y el costo es mayor a 0 o si la matricula es falsa y el costo es 0
        if (params.matricula && params.costoMatricula > 0 || !params.matricula && params.costoMatricula === 0) {
            newOptions = optionsReader(params);
            Options.find({}, (err, options) => {
                if (options.length > 0) {
                    res.status(500).send({
                        message: "Ya hay un archivo de opciones creado, debes actualizar la existente.",
                        type: "err"
                    });
                } else {
                    newOptions.save((err, OptionStored) => {
                        if (err) {
                            res.status(500).send({
                                message: "Error al guardar las opciones.",
                                type: 'err'
                            });
                        } else {
                            if (!OptionStored) {
                                res.status(404).send({
                                    message: "No se pudo guardar las opciones.",
                                    type: 'err'
                                });
                            } else {
                                res.status(200).send({
                                    type: "ok",
                                    message: 'Registro completo! Se crearon las opciones'
                                });
                            }
                        }
                    });
                }
            });
        } else {
            res.status(200).send({
                message: "Asegurate que los datos esten correctamente ingresados. Si activas el cobro de matriculas, el costo debe ser mayor a 0.",
                type: 'err'
            });
        }
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function getOptions(req, res) {
    if (req.user.role == 'admin') {
        Options.find({}, (err, options) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!options) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay opciones!'
                    });
                } else {
                    res.status(200).send({
                        options
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

function updateOptions(req, res) {
    var optionId = req.params.id;
    var params = req.body;
    if (req.user.role == 'admin') {
        // Solo dejo agregar si la matricula es true y el costo es mayor a 0 o si la matricula es falsa y el costo es 0
        if (params.matricula && params.costoMatricula > 0 || !params.matricula && params.costoMatricula === 0) {
            Options.findByIdAndUpdate(optionId, params, (err, optionsUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar las opciones.',
                        type: 'err'
                    });
                } else {
                    if (!optionsUpdated) {
                        res.status(404).send({
                            message: 'No se pudo actualizar las opciones.',
                            type: 'err'
                        });
                    } else {
                        res.status(200).send({
                            options: optionsUpdated
                        });
                    }
                }
            });
        } else {
            res.status(200).send({
                message: "Asegurate que los datos esten correctamente ingresados. Si activas el cobro de matriculas, el costo debe ser mayor a 0.",
                type: 'err'
            });
        }
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function optionsReader(params) {
    var newOption = new Option();
    newOption.matricula = params.matricula;
    newOption.costoMatricula = params.costoMatricula;
    return newOption;
}

// export
module.exports = { addOptions, getOptions, updateOptions };