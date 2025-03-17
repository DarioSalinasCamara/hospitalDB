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

const deleteHospital = async( req, res = response ) => {

    const idHospital = req.params.id;
    
    try {

        const hospital = await Hospital.findById(idHospital);

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'deleteHospital, id de hospital no encontrada en BBDD'
            });
        }

        await Hospital.findByIdAndDelete( idHospital );

        res.json({
            ok: true,
            msg: 'deleteHospital',
            idHospital
            
        })
        
    } catch (error) {

        console.log(error);
        res.status({
            ok: false,
            msg: 'deleteHospital'
        })
    }
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

        const hospitalUpdate = {
            ...req.body,
            usuario: req.uid,
            
        }

        const updateHospital = await Hospital.findByIdAndUpdate( idHospital, updateHospital, { new: true });

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            updateHospital: updateHospital
            
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