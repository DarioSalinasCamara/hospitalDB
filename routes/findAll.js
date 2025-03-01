//
//  **Ruta: 'api/findAll/:find'**
//

const { Router } = require('express');
const { getAll } = require('../controllers/findAll');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get( '/:find', validarJWT, getAll);



module.exports = router;