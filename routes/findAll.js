//
//  **Ruta: 'api/findAll/'**
//

const { Router } = require('express');
const { getAll, getAllCollection } = require('../controllers/findAll');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get( '/:find', validarJWT, getAll);

router.get( '/collection/:table/:findParam', validarJWT, getAllCollection);



module.exports = router;