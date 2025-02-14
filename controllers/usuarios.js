const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async( req, res ) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            });
        }

        const usuario = new Usuario( req.body );

        //Encriptación
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //generar el JWT
        const token = await generarJWT( usuario.id );

        await usuario.save();
        console.log(req.body);
    
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const updateUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe la id'
            });
        }

        //Update
        const { email, ...usuario} = req.body;

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail) 
            return res.status(400).json({
            ok: false,
            msg: 'El correo ya ha sido registrado anteriormente'
        })

        usuario.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, usuario, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error 400'
        })
    }
}

const deleteUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){

            return res.status(400).json({
                ok: false,
                msg: 'No existe la id'
            });
        }

        //Delete
        const usuario = req.body;
        
        const usuarioBorrado = await Usuario.findByIdAndDelete(uid, usuario, { new: true });

        res.json({
            ok: true,
            msg:"Usuario borrado de la base de datos correctamente",
            usuarioBorrado
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error 400'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}