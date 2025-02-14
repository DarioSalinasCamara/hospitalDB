const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
             return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
             });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password);

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            })
        }

        //generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error 400'
        });
    }
}

module.exports = login;