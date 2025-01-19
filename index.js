const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Cors
app.use(cors());

//Iniciar base de datos
dbConnection();

console.log( process.env )

//solo
//solo123

//Rutas
app.get( '/', ( req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })

});


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
})