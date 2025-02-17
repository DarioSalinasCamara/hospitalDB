const { response } = require('express');

const Hospotal = require('../models/hospital');

const getHospitales = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'getHospitales'
    })
}

const createHospital = ( req, res = response ) => {

    const hospital = new Hospital(req.body);

    try {

        res.json({
            ok: true,
            msg: 'createHospital'
        })
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg:'Error createHospital'
        })
    }


}

const deleteHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })

}

const updateHospital = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })

}



module.exports = {
    getHospitales,
    updateHospital,
    deleteHospital,
    createHospital
}