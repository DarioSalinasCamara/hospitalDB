//
//  **Ruta: 'api/usuarios'**
//

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js'); 
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get( '/', validarJWT, getUsuarios);

router.post( '/', [
    check( 'nombre', 'Nombre vacio' ).notEmpty(),
    check( 'password', 'Password vacia' ).notEmpty(),
    check( 'email', 'Email no valido' ).isEmail(),
    validarCampos,
], createUsuario);

router.put( '/:id',[
    validarJWT,
    check( 'nombre', 'Nombre vacio' ).notEmpty(),
    check( 'email', 'Email no valido' ).isEmail(),
    check( 'role', 'Role obligatorio' ).notEmpty(),
], updateUsuario);

router.delete( '/:id', deleteUsuario);


module.exports = router;