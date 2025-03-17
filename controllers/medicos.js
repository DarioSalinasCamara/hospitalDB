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

const deleteMedico = async( req, res = response ) => {

    const idMedico = req.params.id;

    try {

        const medico = await Medico.findById(idMedico);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'deleteMedico, id de medico no encontrada en BBDD'
            });
        }

        await Medico.findByIdAndDelete( idMedico );

        res.json({
            ok: true,
            msg: 'deleteMedico',
            idMedico
            
        })
        
    } catch (error) {

        console.log(error);
        res.status({
            ok: false,
            msg: 'deleteMedico'
        })  
    }
}

const updateMedico = async( req, res = response ) => {

    const idMedico = req.params.id;
        
        try {
    
            const medico = await Medico.findById(idMedico);
    
            if(!medico){
                return res.json({
                    ok: false,
                    msg: 'updateMedico, id de medico no encontrada en BBDD'
                });
            }
    
            const updateMedico = {
                ...req.body,
                usuario: req.uid,
                
            }
    
            const updatedMedico = await Medico.findByIdAndUpdate( idMedico, updateMedico, { new: true });
    
            res.json({
                ok: true,
                msg: 'updateMedico',
                updatedMedico: updatedMedico
                
            })
            
        } catch (error) {
    
            console.log(error);
            res.status({
                ok: false,
                msg: 'updateMedico'
            })
            
        }
}

module.exports = {
    getMedicos,
    createMedico,
    deleteMedico,
    updateMedico
}