const getMedicos = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'getMedicos'
    })
}

const createMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'crearMedicos'
    })

}

const deleteMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })

}

const updateMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })

}



module.exports = {
    getMedicos,
    createMedico,
    deleteMedico,
    updateMedico
}