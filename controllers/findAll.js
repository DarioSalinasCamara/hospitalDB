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

const getAllCollection = async( req, res = response ) => {
    const table = req.params.table;
    const findParam = req.params.findParam;
    const regExp = new RegExp ( findParam, 'i');
    let result = [];

    if(table === 'medicos'){
        result = await Medico.find({ nombre: regExp  })
                                .populate( 'usuario', 'nombre img')
                                .populate( 'hospital', 'nombre img');

    }else if( table === 'hospitales'){
        result =  await Hospital.find({ nombre: regExp })
                                .populate( 'usuario', 'nombre img');

    }else if ( table === 'usuarios'){
        result =  await Usuario.find({ nombre: regExp })

    }else {
        return res.status(400).json({
            ok: false,
            msg: 'La tabla debe ser medicos, hospitales o usuarios'
        })
    }
    
        res.json({
            ok: true,
            result,
            msg: 'getAllCollection'
        })
    }

module.exports = { 
    getAll,
    getAllCollection
 };