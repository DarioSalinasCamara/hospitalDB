/*
    Ruta: 'api/login'
*/

const { Router } = require('express');
const { login, googleSingIn, renewJWT } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.post( '/',
    [
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'Password obligatoria').not().isEmpty(),
        validarCampos
    ], login);

router.post( '/google',
    [
        check('token', 'El token de google es obligatorio').notEmpty(),
        validarCampos
    ], googleSingIn);

router.get( '/renew',
        validarJWT,
        renewJWT);
    

module.exports = router;