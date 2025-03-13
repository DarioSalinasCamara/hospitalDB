const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async( req, res = response ) => {

    const hospitales = await Hospital.find().populate( 'usuario', 'nombre role');

    res.json({
        ok: true,
        hospitales,
        msg: 'getHospitales'
    })
}

const createHospital = async( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        ...req.body,
        usuario: uid
        });

        console.log(hospital)

    try {

        await hospital.save();

        res.json({
            ok: true,
            hospital,
            msg: 'createHospital'
        })
        
    } catch (error) {
        
        console.log(error);
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

const updateHospital = async( req, res = response ) => {

    const idHospital = req.params.id;

    try {

        const hospital = await Hospital.findById(idHospital);

        if(!hospital){
            return res.json({
                ok: false,
                msg: 'actualizarHospital, id de hospital no encontrada en BBDD'
            });
        }

        

        res.json({
            ok: true,
            msg: 'actualizarHospital'
        })
        
    } catch (error) {

        console.log(error);
        res.status({
            ok: false,
            msg: 'actualizarHospital'
        })
        
    }
}



module.exports = {
    getHospitales,
    updateHospital,
    deleteHospital,
    createHospital
}