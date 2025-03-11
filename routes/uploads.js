//
//  **Ruta: 'api/uploads'**
//

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();
router.use( expressFileUpload());

router.put( '/:type/:id', validarJWT, fileUpload);



module.exports = router;