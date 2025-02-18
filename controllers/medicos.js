const Hospital = require("../models/hospital")
const Medico = require('../models/medico');

const getMedicos = async( req, res = response ) => {

    const medicos = await Medico.find().populate( 'hospital', 'nombre').populate( 'usuario', 'nombre  role');

    res.json({
        ok: true,
        medicos,
        msg: 'getMedicos'
    })
}

const createMedico = async( req, res = response ) => {

    const uid = req.uid
    //const hospital = await Hospital.findById(req.body.hospitalId);
    
    const medico = new Medico({
        ...req.body,
        usuario: uid,
        hospital: req.body.hospitalId
    });

    try {

        await medico.save();

        res.json({
            ok: true,
            medico,
            msg: 'createMedicos'
        })

    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg:'Error createMedico'
        })
    }
}

const deleteMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })

}

const updateMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })

}

module.exports = {
    getMedicos,
    createMedico,
    deleteMedico,
    updateMedico
}