//
//  **Ruta: 'api/medicos'**
//

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js'); 
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get( '/', getMedicos);

router.post( '/', [
    validarJWT,
    check( 'nombre', ' Nombre del médico obligatorio. ').notEmpty(),
    check( 'hospital', ' El id del hospital no es valido. ').isMongoId(),
    validarCampos 
], createMedico);

router.put( '/:id',[
    
], updateMedico);

router.delete( '/:id',
    validarJWT,
    deleteMedico);


module.exports = router;