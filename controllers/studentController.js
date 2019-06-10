/* jshint -W097, -W117, -W119, -W104 */
'use strict';
// Modulos

//Servicios

//Modelos
var Student = require('../models/studentModel');

// Acciones
function addStudent(req, res) {
    var student = new Student();
    var params = req.body;
    if (params.name && params.surname && params.birthDate && params.father && params.state && params.gender) {
        student = studentReader(params);
        student.save((err, studentStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error al guardar el alumno",
                    type: 'err'
                });
            } else {
                if(!studentStored) {
                    res.status(404).send({
                        message: "Error al guardar el alumno",
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        type: "ok",
                        message: 'Registro completo! Se creo un nuevo alumno: ' + student.name + ' ' + student.surname +'.'
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

function getStudents(req, res) {
    if (1) {
        Student.find({}, (err, students) => {
            if (err) {
                res.status(500).send({
                    status: 'err',
                    message: 'Error en la peticion!'
                });
            } else {
                if (!students) {
                    res.status(404).send({
                        status: 'err',
                        message: 'No hay alumnos!'
                    });
                } else {
                    res.status(200).send({
                        students
                    });
                }
            }
        }).populate('father');
    } else {
        res.status(404).send({
            status: 'err',
            message: 'No tienes permiso para realizar esta peticion.'
        });
    }
}

function updateStudent (req, res) {
    var studentId = req.params.id;
    var params = req.body;
    if(params.name && params.surname && params.birthDate && params.father) {
        Student.findByIdAndUpdate(studentId, params, (err, studentUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar el alumno',
                    type: 'err'
                });
            } else {
                if (!studentUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar el alumno',
                        type: 'err'
                    });
                } else {
                    res.status(200).send({
                        student: studentUpdated
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

function studentReader(params) {
    var student = new Student();
    student.name = params.name;
    student.surname = params.surname;
    student.birthDate = params.birthDate;
    student.phone = params.phone;
    student.details = params.details;
    student.father = params.father;
    student.state = params.state;
    student.gender = params.gender;
    return student;
}

// export
module.exports = { addStudent, getStudents, updateStudent };
