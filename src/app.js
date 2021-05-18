const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Usuario = require("./model/usuario");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
process.env.PORT = process.env.PORT || 3000;

//uso de librerias o modulos 
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Uso de las rutas
app.use(require('./routes/routes'));


//coneccion a la base
mongoose.connect(
    "mongodb+srv://kevin:kevin@pruebamongodb-6oz0y.mongodb.net/MED_WEB_ATLAS?retryWrites=true&w=majority", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    // "mongodb://localhost:27017/autentificacion"
    // "mongodb://localhost:27017/autentificacion", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log("Base de datos Local!");
    }
);

//puerto de salida
// process.env.PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
});