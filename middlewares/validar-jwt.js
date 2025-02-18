const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('token');

    if( !token ) {

        return res.status(401).json({

            ok: false,
            msg: 'No hay token en la petición'

        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SKEY );
        req.uid = uid;
        next();

        console.log(uid + " uid en validar-jwt.js");
    } catch (error) {
        
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        });
    }


}



module.exports = { 
    
    validarJWT
}