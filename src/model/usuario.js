const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usurarioSchema = new Schema({
    cedula: {
        type: Number,
        required: [true, "la cedula es requerida"],
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"],
    }
});

let usurarioSchema2 = new Schema({
    cedula: {
        type: Number,
        required: [true, "la cedula es requerida"],
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"],
    },
    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    nombreUsuario: {
        type: String,
        required: [true, "El nombre de usuario es requerido"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerido"],
    },
    telefono: {
        type: String,
        required: [true, "El telefono es requerido"],
    },
    direccion: {
        type: String,
        required: [true, "la direccion es requerido"],
    },
    fechaNacimiento: {
        type: String,
        required: [true, "La fecha de nacimiento es requerido"],
    },
    codigoPostal: {
        type: String,
        required: [true, "El codigo postal es requerido"],
    },
    tipoSangre: {
        type: String,
        required: [true, "El tipo de sangre es requerido"],
    },
    sexo: {
        type: String,
        required: [true, "El sexo es requerido"],
    },
    oficio: {
        type: String,
        required: [true, "El oficio es requerido"],
    },
    celular: {
        type: String,
        required: [true, "El tipo de celular es requerido"],
    },
    etnia: {
        type: String,
        required: [true, "La etnia es requerida"],
    }
});

module.exports = mongoose.model("Usuario", usurarioSchema2);