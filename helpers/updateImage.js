const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const updateImage = async(type, id, fileName) => {

    if(type === 'medicos'){
        const medico = await Medico.findById(id);

        if(!medico){
            console.log('No existe medico con esa id');
            return false;
        }

        const oldPath = `./uploads/medicos/${medico.img}`;

        deleteImagen(oldPath);

        medico.img = fileName;
        await medico.save();
        return true;

    }else if(type === 'hospitales'){

        const hospital = await Hospital.findById(id);

        if(!hospital){
            console.log('No existe hospital con esa id');
            return false;
        }

        const oldPath = `./uploads/hospitales/${hospital.img}`;

        deleteImagen(oldPath);

        hospital.img = fileName;
        await hospital.save();
        return true;

    }else if (type === 'usuarios'){

        const usuario = await Usuario.findById(id);

        if(!usuario){
            console.log('No existe usuario con esa id');
            return false;
        }

        const oldPath = `./uploads/usuarios/${usuario.img}`;

        deleteImagen(oldPath);

        usuario.img = fileName;
        await usuario.save();
        return true;

    }
}

const deleteImagen = ( path ) => {
    if(fs.existsSync(path)){
        //Borrar la imagen ya existente
        fs.unlinkSync(path);
    }
}

module.exports = {
    updateImage
}