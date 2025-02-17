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
    
], createMedico);

router.put( '/:id',[
    
], updateMedico);

router.delete( '/:id', deleteMedico);


module.exports = router;