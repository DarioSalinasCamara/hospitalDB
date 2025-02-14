const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Cors
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Iniciar base de datos
dbConnection();

//solo
//solo123

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
})