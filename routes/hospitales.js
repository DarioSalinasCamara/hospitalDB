//
//  **Ruta: 'api/hospitales'**
//

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js'); 
const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get( '/', getHospitales);

router.post( '/', [
    validarJWT,
    check( 'nombre', ' Nombre de hospital obligatorio ').notEmpty(),
    validarCampos 
], createHospital);

router.put( '/:id',[
    check( 'nombre', ' Nombre de hospital obligatorio ').notEmpty(),
    validarCampos    
], updateHospital);

router.delete( '/:id', deleteHospital);


module.exports = router;