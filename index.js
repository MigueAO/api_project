const express = require('express'); //Sintáxis de importación NodeJS

require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Parciar objetos JSON
app.use(express.json());

//Estableciendo conexion a la BD
dbConection();

//Rutas de la API Proyectos
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.route'));

//Código para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log("Servidor desplegado en el pueto: "+ process.env.PORT);
})