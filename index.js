const express = require('express'); //Sintáxis de importación NodeJS
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Estableciendo conexion a la BD
dbConection();

//Rutas de la API Proyectos
app.get('/',(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:'Bienvenidos a NodeJS'
    })
})

//Código para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log("Servidor desplegado en el pueto: "+ process.env.PORT);
})