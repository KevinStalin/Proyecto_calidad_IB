const express = require('express');
// const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario');
//correo
const nodemailer = require('nodemailer');
//
const app = express();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akmnj2021@gmail.com',
        pass: 'correo123?'
    }
});



let generaCode = (word) => {
    return new Promise((resolve, reject) => {
        a = 2;
        vector = [];
        fc = [];
        clave = 0;
        suma = 0;

        k = word.length;
        for (let x = 0; x < word.length; x++) {
            k -= 1;
            if (k < 0) {
                break;
            }
            if (word[x] != ' ') {
                vector.push(word[x].charCodeAt(0));
                clave = (word[x].charCodeAt(0)) * (Math.pow(a, k));
                fc.push(clave);
                suma += clave;
            } else {
                vector.push(0);
                fc.push(0);
            }
        }
        // console.log(word);
        // console.log('ACCI', vector);
        // console.log('fc', fc);
        // console.log('Polinomial', suma);
        resolve(suma);
    });
}

async function funcionCodifica(word) {
    a = 7;
    vector = [];
    fc = [];
    clave = 0;
    suma = 0;

    k = word.length;
    for (let x = 0; x < word.length; x++) {
        k -= 1;
        if (k < 0) {
            break;
        }
        if (word[x] != ' ') {
            vector.push(word[x].charCodeAt(0));
            clave = (word[x].charCodeAt(0)) * (Math.pow(a, k));
            fc.push(clave);
            suma += clave;
        } else {
            vector.push(0);
            fc.push(0);
        }
    }
    // console.log(word);
    // console.log('ACCI', vector);
    // console.log('fc', fc);
    // console.log('Polinomial', suma);
    return suma;

}
let getCode = async(word) => {
        return await generaCode(word);
    }
    // let codigoFinal = (word) => {
    //         getCode(word).then(res => { return res });
    //     }
    // app.get('/', (req, res) => {
    //     res.send({ listo: "Completado" });
    // });

app.post("/API/registro", (req, res) => {
    let body = req.body;
    let word = body.nombre + body.apellido;
    // let codigoUnico = codigoFinal(word);

    getCode(word).
    then(cod => {
            console.log('COD', cod);
            console.log('-->usuario');

            console.log(word);
            let primerosDos = cod.toString().substring(0, 2);
            let segunsoDos = cod.toString().substring(2, 4);
            let terceroDos = cod.toString().substring(4, 6);

            let usuario = {
                cedula: body.cedula,
                nombre: body.nombre,
                apellido: body.apellido,
                correo: body.correo,
                nombreUsuario: body.nombreUsuario,
                password: body.password,
                telefono: body.telefono,
                direccion: body.direccion,
                fechaNacimiento: body.fechaNacimiento,
                codigoPostal: body.codigoPostal,
                tipoSangre: body.tipoSangre,
                sexo: body.sexo,
                religion: body.religion,
                oficio: body.oficio,
                numero1: Number(primerosDos),
                numero2: Number(segunsoDos),
                numero3: Number(terceroDos),
            };
            let usuariob = new Usuario(usuario);
            console.log(usuario);
            let mensaje = '';
            mensaje += 'Su codigo para autentificarse en el sitema es'
            mensaje += ' ' + '"' + cod + '"';

            let mailOptions = {
                from: 'akmnj2021@gmail.com',
                to: usuario.correo,
                subject: 'Codigo Autentificacion',
                text: mensaje
            };
            usuariob.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });
                res.json({
                    mensaje: "usuario agreagado",
                    codigo: cod
                });
            });

        })
        .catch(err => console.log(err));
});

app.get('/API/consultaCodigo/:correo', (req, res) => {
    let correoU = req.params.correo;
    // console.log(nombre);
    Usuario.findOne({ correo: correoU }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            console.log(usuariosDB);
            console.log('N1-->', usuariosDB.numero1);
            let numero1 = Math.random() * (99 - 10) + 10;
            let numero2 = Math.random() * (99 - 10) + 10;
            let numero3 = Math.random() * (99 - 10) + 10;
            let respuesta = [{
                    n1: parseInt(numero2, 10),
                    n2: usuariosDB.numero2,
                    n3: parseInt(Math.random() * (99 - 10) + 10, 10),
                },
                {
                    n1: parseInt(numero3, 10),
                    n2: parseInt(Math.random() * (99 - 10) + 10, 10),
                    n3: parseInt(Math.random() * (99 - 10) + 10, 10),
                },
                {
                    n1: parseInt(numero3, 10),
                    n2: parseInt(Math.random() * (99 - 10) + 10, 10),
                    n3: parseInt(Math.random() * (99 - 10) + 10, 10),
                },
                {
                    n1: parseInt(numero3, 10),
                    n2: parseInt(Math.random() * (99 - 10) + 10, 10),
                    n3: usuariosDB.numero3,
                },
                {
                    n1: usuariosDB.numero1,
                    n3: parseInt(numero1, 10),
                    n2: parseInt(Math.random() * (99 - 10) + 10, 10),
                },
            ];
            res.json(respuesta);
        } else {
            res.json({
                ok: false,
                err: {
                    message: "Usuario no encontradado",
                },
            });
        }

    });
});

app.post('/API/login', (req, res) => {
    let body = req.body;
    let login = {
        correo: body.correo,
        password: body.password,
        numero1: body.numero1,
        numero2: body.numero2,
        numero3: body.numero3,
    }
    console.log(login);
    Usuario.findOne({
        correo: login.correo,
        password: login.password,
        numero1: login.numero1,
        numero2: login.numero2,
        numero3: login.numero3,
    }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (user) {
            res.json({
                ok: true,
                message: 'Usiario Validado'
            });
        } else {
            res.json({
                ok: false,
                message: 'Datos invalidos'
            });
        }

    });
});

//prueba traer todo
app.get('/API/con', (req, res) => {
    // let nombre = req.params.id;
    // console.log(nombre);
    Usuario.find({}).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json(usuariosDB);
    });
});

//Nuevoa metodos Validos con Angular 
app.post("/API/registrar", (req, res) => {
    let body = req.body;
    let usuario = {
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.email,
        nombreUsuario: body.nombreUsuario,
        password: body.password,
        telefono: body.telefono,
        direccion: body.direccion,
        fechaNacimiento: body.fecha,
        codigoPostal: body.codigoPostal,
        tipoSangre: body.tipoSangre,
        sexo: body.genero,
        oficio: body.oficio,
        celular: body.celular,
        etnia: body.etnia
    };
    let usuariob = new Usuario(usuario);
    usuariob.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            mensaje: "usuario agreagado",
        });
    });
});

app.get('/API/verifica_correo/:correo', (req, res) => {
    let correoUsuario = req.params.correo;
    Usuario.findOne({ correo: correoUsuario }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            res.json({
                ok: false,
                message: "Usuario Encontradado",
            });
        } else {
            res.json({
                ok: true,
                message: "Usuario No encontradado",
            });
        }
    });
});

module.exports = app;