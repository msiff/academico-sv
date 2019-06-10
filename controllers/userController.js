/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos
var bcrypt = require('bcrypt-nodejs');

//Servicios

//Modelos
var User = require('../models/userModel');

// Acciones
function registrarUser(req, res) {
    var user = new User();
    var params = req.body;
    if (params.name && params.surname && params.alias && params.role && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.alias = params.alias;
        user.password = params.password;
        user.role = params.role;
        User.findOne({ alias: user.alias }, (err, userRepeat) => {
            if (err) {
                res.status(500).send({
                    message: "Error al comprobar el usuario",
                    type: 'err'
                });
            } else {
                if (!userRepeat) {
                    // Si no hay usuario con ese alias lo guardo
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                    });
                    // Guardar el usuario en la BD.
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({
                                message: "Error al guardar el usuario",
                                type: 'err'
                            });
                        } else {
                            if (!userStored) {
                                res.status(404).send({
                                    message: "Error al registrar el usuario",
                                    type: 'err'
                                });
                            } else {
                                res.status(200).send({
                                    type: "ok",
                                    message: 'Registro completo! Se creo un nuevo usuario ' + user.alias + '.'
                                });
                            }
                        }
                    }
                    );
                } else {
                    res.status(200).send({
                        message: "El alias para un usuario que has elegido se encuentra en uso. Elige otro!.",
                        type: 'err'
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

function loginUser(req, res) {
    var params = req.body;
    var alias = params.alias;
    var password = params.password;
    // Busca si existe algun usuario con ese alias.
    User.findOne({ alias: alias }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error al comprobar el usuario"
            });
        } else {
            if (user) {
                // Si existe comprueba que la contrasena ingresada sea corecta
                // Si esta todo ok devuelve el objeto user.
                bcrypt.compare(password, user.password, (err, check) => {
                    if (err) {
                        return res.status(404).send({
                            type: "err",
                            message: "Error con la contraseña, intenta de nuevo."
                        });
                    }
                    if (check) {
                        // Devolver datos de usuario
                        res.status(200).send({
                            user
                        });
                    } else {
                        res.status(404).send({
                            message: "Contraseña incorrecta",
                            type: 'err'
                        });
                    }
                });

            } else {
                res.status(404).send({
                    message: "No se encuentrar registros con ese alias",
                    type: 'err'
                });
            }
        }
    });
}

function getUsers(req, res) {
    if (req.user.role == 'admin' || req.user.role == 'employee') {
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!users) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay usuarios!'
                    });
                } else {
                    res.status(200).send({
                        users
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

function updateUser(req, res) {
    var userId = req.params.id;
    var params = req.body;
    if (params.name == '' || params.surname == '' || params.alias == '' || params.role == '' || params.createdAt == '') {
        res.status(500).send({
            message: 'Error al actualizar usuario',
            type: 'err'
        });
    } else {
        if (params.password == '') {
            // Si la password viene es porque no fue modificada y en el front no la tengo debido a que me 
            // llega encryptada. Si la envio de nuevo vendria encryptada.
            delete params.password;
            User.findByIdAndUpdate(userId, params, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar usuario',
                        type: 'err'
                    });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({
                            message: 'No se pudo actualizar usuario',
                            type: 'err'
                        });
                    } else {
                        res.status(200).send({
                            user: userUpdated
                        });
                    }
                }
            });
        } else {
            bcrypt.hash(params.password, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({
                        message: 'Error con la contraseña, intente de nuevo.',
                        type: 'err'
                    });
                } else {
                    params.password = hash;
                    User.findByIdAndUpdate(userId, params, (err, userUpdated) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error al actualizar usuario',
                                type: 'err'
                            });
                        } else {
                            if (!userUpdated) {
                                res.status(404).send({
                                    message: 'No se pudo actualizar usuario',
                                    type: 'err'
                                });
                            } else {
                                res.status(200).send({
                                    user: userUpdated
                                });
                            }
                        }
                    });
                }
            });
        }
    }
}

// export
module.exports = { registrarUser, loginUser, getUsers, updateUser };
