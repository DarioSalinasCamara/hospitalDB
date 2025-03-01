const { response } = require('express');
const  Usuario  = require('../models/usuario');
const  Hospital  = require('../models/hospital');
const  Medico  = require('../models/medico');


const getAll = async( req, res = response ) => {

const params = req.params.find;
const regExp = new RegExp ( params, 'i');



const [findUsuarios, findhospitals, findmedicos] =  await Promise.all([

    Usuario.find({ nombre: regExp }),
    Hospital.find({ nombre: regExp }),
    Medico.find({ nombre: regExp })
])

    res.json({
        ok: true,
        findUsuarios,
        findhospitals,
        findmedicos,
        msg: 'getAll'
    })
}

module.exports = { 
    getAll
 };