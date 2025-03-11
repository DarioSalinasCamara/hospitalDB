const { response } = require('express');
const { v4: uuidv4 } = require('uuid');


const fileUpload = ( req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    //Validar el tipo.
    const typeValidation = [ 'hospitales', 'medicos', 'usuarios' ];
    if( !typeValidation.includes(type)){
        return res.status(400).json({

            ok: false,
            msg: 'Tipo introducido no valido, los tipos validos son: médico, hospital o usuario'

        });
    }

    //Validar si se ha subido archivo
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
            
        });
    }

    const file = req.file.imagen;
    const splitName = file.name.split('.');
    const fileExtension = splitName[splitName.length - 1];

    //Validar extension del archivo
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtensions.includes( fileExtension )){
        
        return res.status(400).json({
            ok: false,
            msg: 'Tipo de imagen no valido, tipos validos: png, jpg, jpeg y gif'
        });
    }

    //Generar nombre archivo
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    //Ruta donde guardar los archivos
    const uploadPath = `./uploads/${ type }`

    //Mover archivo al server
    file.mv(uploadPath, function(err) {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    
        res.json ({
            ok: true,
            msg: 'Archivo subido correctamente',
            fileName
        });
      });

}


module.exports = {
    fileUpload
}