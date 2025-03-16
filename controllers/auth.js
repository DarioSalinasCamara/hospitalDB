const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

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

const googleSingIn = async(req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        ///JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            email,
            name,
            picture
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Token de google no valido'

        });
    }
}

const renewJWT = async ( req, res ) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    res.json({
        ok: true,
        uid,
        token
    });

}

module.exports = {
    login,
    googleSingIn,
    renewJWT

}