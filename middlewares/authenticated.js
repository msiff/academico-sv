/* jshint -W097, -W117, -W119, -W104 */
'use strict';

exports.ensureAuth = function (req, res, next) {
    // compureba si viene cabecera de autenticacion 
    if (!req.headers.authorization) {
        // console.log('Entro!');
        return res.status(403).send({ message: 'La peticion no tiene cabecera de autenticacion' });
    } else {
        // le asigno a la request el usuario que realizo la peticion. Para tenerlo disponible.
        req.user = JSON.parse(req.headers.authorization);
        // Next para pasar al siguiente metodo de la ruta y que no se quede aca dentro. 
        next();
    }
};