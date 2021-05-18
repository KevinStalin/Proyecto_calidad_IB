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
app.post("/API/login", (req, res) => {
    let body = req.body
    let pass = body.password;
    let email = body.email
    console.log(body)
    console.log(pass, email)
    Usuario.findOne({ correo: email, password: pass }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            // console.log(usuariosDB)
            // console.log(usuariosDB.password, pass, usuariosDB.correo, email)
            // if (usuariosDB.password == pass && usuariosDB.correo == email) {
            //     console.log("correcto!!")
            // } else {
            //     console.log("incorrecto")
            // }
            res.json({
                ok: true,
                message: 'Usiario Validado'
            });
        } else {
            res.json({
                ok: false,
                message: 'Usiario NO Validado'
            });
        }
    });
});
// app.post("/API/registro", (req, res) => {
//     let body = req.body;
//     let word = body.nombre + body.apellido;
//     // let codigoUnico = codigoFinal(word);

//     getCode(word).
//     then(cod => {
//             console.log('COD', cod);
//             console.log('-->usuario');

//             console.log(word);
//             let primerosDos = cod.toString().substring(0, 2);
//             let segunsoDos = cod.toString().substring(2, 4);
//             let terceroDos = cod.toString().substring(4, 6);

//             let usuario = {
//                 cedula: body.cedula,
//                 nombre: body.nombre,
//                 apellido: body.apellido,
//                 correo: body.correo,
//                 nombreUsuario: body.nombreUsuario,
//                 password: body.password,
//                 telefono: body.telefono,
//                 direccion: body.direccion,
//                 fechaNacimiento: body.fechaNacimiento,
//                 codigoPostal: body.codigoPostal,
//                 tipoSangre: body.tipoSangre,
//                 sexo: body.sexo,
//                 religion: body.religion,
//                 oficio: body.oficio,
//                 etnia: body.etnia,
//                 celular: body.celular,
//                 numero1: Number(primerosDos),
//                 numero2: Number(segunsoDos),
//                 numero3: Number(terceroDos),
//             };
//             let usuariob = new Usuario(usuario);
//             console.log(usuario);
//             let mensaje = '';
//             mensaje += 'Su codigo para autentificarse en el sitema es'
//             mensaje += ' ' + '"' + cod + '"';

//             let mailOptions = {
//                 from: 'akmnj2021@gmail.com',
//                 to: usuario.correo,
//                 subject: 'Codigo Autentificacion',
//                 text: mensaje
//             };
//             usuariob.save((err, usuarioDB) => {
//                 if (err) {
//                     return res.status(400).json({
//                         ok: false,
//                         err,
//                     });
//                 }
//                 transporter.sendMail(mailOptions, function(error, info) {
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         console.log('Email enviado: ' + info.response);
//                     }
//                 });
//                 res.json({
//                     mensaje: "usuario agreagado",
//                     codigo: cod
//                 });
//             });

//         })
//         .catch(err => console.log(err));
// });


app.get("/API/recuperar/:correo", (req, res) => {
    let correoU = req.params.correo;
    console.log("correou==", correoU.email)
        // let codigoUnico = codigoFinal(word);
    Usuario.findOne({ correo: correoU }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            console.log(usuariosDB);
            // let numerouser = usuariosDB.numero1;
            console.log('Contra->', usuariosDB.password);

            // let usuario = {
            //     correo: usuariosDB.correo,
            //     password: usuariosDB.password
            // };
            // let usuariob = new Usuario(usuario);
            // console.log("--------", usuario);
            let mensaje = '';
            mensaje += 'Su contraseña para autentificarse en el sitema WG es:'
            mensaje += ' ' + '"' + usuariosDB.password + '"';
            let mailOptions = {
                from: 'akmnj2021@gmail.com',
                to: usuariosDB.correo,
                subject: 'Codigo Autentificacion',
                text: mensaje
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });
            // usuariob.save((err, usuarioDB) => {
            //     if (err) {
            //         return res.status(400).json({
            //             ok: false,
            //             err,
            //         });
            //     }

            //     res.json({
            //         mensaje: "usuario agreagado",
            //         codigo: "1234"
            //     });

            // })



        } else {
            console.log(usuariosDB);
            res.json({
                ok: false,
                err: {
                    message: "Usuario no ",
                },
            });
        }

    });







});

app.get('/API/consultaCodigo/:correo', (req, res) => {
    let correoU = req.params.correo;
    // console.log(correoU);
    Usuario.findOne({ correo: correoU }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            console.log(usuariosDB);
            let numerouser = usuariosDB.numero1;
            console.log('N1-->', usuariosDB.numero1);
            console.log("numero", numerouser);
            let numero1 = Math.random() * (99 - 10) + 10;
            let numero2 = Math.random() * (99 - 10) + 10;
            let numero3 = Math.random() * (99 - 10) + 10;
            var a = [0, 1, 2, 3, 4, 5]
            var aux = 0

            var respuesta = [];
            var paisesenvio = [];
            var continenteenvio = []
            var paises = [
                ["Canada", "EEUU", "México", "Canada", "EEUU", "México", "Canada", "EEUU", "México", "EEUU"], //0 -america norte
                ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "Guatemala", "Honduras", "Jamaica", "Paraguay", "Perú"], //-1 america sur
                ["Banglades", "Barein", "Camboya", "Catar", "China", "Filipinas", "India", "Indonesia", "Irak", "Iran"], //-2    asia
                ["España", "Estonia", "Finlandia", "Francia", "Islandia", "Noruega", "Portugal", "Rusia", "Suecia", "Suiza"], //-3 europa
                ["Angola", "Argelia", "Burundi", "Camerun", "Egipto", "Eritrea", "Gambia", "Ghana", "Guinea", "Libia"], //-4 africa
                ["Australia", "Fiyi", "Kiribati", "Micronesia", "Nauru", "Palaos", "Samoa", "Tonga", "Tuvalu", "Vanuatu"] //-5 oceania
            ]
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 5; j++) {
                    var continente = parseInt(Math.random() * (6 - 0) + parseInt(0)) // para la region filas
                    var pais = parseInt(Math.random() * (10 - 0) + parseInt(0)) // para el pais colum
                    for (s = 0; s < 6; s++) {
                        if (continente == a[s]) {
                            a[continente] = 10
                            aux = 0
                        } else {
                            if (aux != 0)
                                aux = 1
                        }
                        console.log("pppppp====== ", a[s], continente)

                    }
                    if (aux == 1) {
                        for (ss = 0; ss < 6; ss++) {
                            if (a[ss] != 10 && aux == 1) {
                                a[continente] = 10
                                aux = 0

                            }
                            console.log("pppppprrr====== ", a[ss], continente)
                        }
                    }
                    paisesenvio.push(paises[continente][pais]);
                    continenteenvio.push(continente)
                        //console.log("=<", paisesenvio[j]);
                }
                console.log(continenteenvio[j - 1], continenteenvio[j - 2], continenteenvio[j - 3], continenteenvio[j - 4], continenteenvio[j - 5]);
                respuesta.push({ p1: { n1: paisesenvio[j - 1], c1: continenteenvio[j - 1] }, p2: { n1: paisesenvio[j - 2], c1: continenteenvio[j - 2] }, p3: { n1: paisesenvio[j - 3], c1: continenteenvio[j - 3] }, p4: { n1: paisesenvio[j - 4], c1: continenteenvio[j - 4] }, p5: { n1: paisesenvio[j - 5], c1: continenteenvio[j - 5] }, cu: { cus: usuariosDB.fechaNacimiento } })
                    //respuesta.push({ c1: continenteenvio[j - 1], c2: continenteenvio[j - 2], c3: continenteenvio[j - 3], c4: continenteenvio[j - 4], c5: continenteenvio[j - 5] })
                var paisesenvio = []
                var continenteenvio = []

            }


            // for (i = 0; i < 4; i++) {

            //     var j = 0;
            //     var datobase = parseInt(Math.random() * (3 - 0) + parseInt(0)) //va del 1 al 3
            //     console.log("datobase", datobase)
            //     if (j == datobase) {
            //         respuesta.push({ n1: parseInt(Math.random() * (99 - 10) + 10, 10), n2: parseInt(Math.random() * (99 - 10) + 10, 10), n3: 0 })
            //             // respuesta.n = usuariosDB.numero2;
            //     } else {
            //         if (j + 1 == datobase) {
            //             respuesta.push({ n1: 1, n2: 0, n3: parseInt(Math.random() * (99 - 10) + 10, 10) })
            //         } else {
            //             respuesta.push({ n1: 0, n2: parseInt(Math.random() * (99 - 10) + 10, 10), n3: 1 })
            //         }
            //     }
            // }

            // respuesta.push({ cu: usuariosDB.fechaNacimiento })
            console.log(respuesta)
            console.log("aqui breoo", usuariosDB.fechaNacimiento)

            // let respuesta = [{
            //         n1: parseInt(numero2, 10),
            //         n2: usuariosDB.numero2,
            //         n3: parseInt(Math.random() * (99 - 10) + 10, 10),
            //     },
            //     {
            //         n1: parseInt(numero3, 10),
            //         n2: parseInt(Math.random() * (99 - 10) + 10, 10),
            //         n3: parseInt(Math.random() * (99 - 10) + 10, 10),
            //     },
            //     {
            //         n1: parseInt(numero3, 10),
            //         n2: parseInt(Math.random() * (99 - 10) + 10, 10),
            //         n3: parseInt(Math.random() * (99 - 10) + 10, 10),
            //     },
            //     {
            //         n1: parseInt(numero3, 10),
            //         n2: parseInt(Math.random() * (99 - 10) + 10, 10),
            //         n3: usuariosDB.numero3,
            //     },
            //     {
            //         n1: usuariosDB.numero1,
            //         n3: parseInt(numero1, 10),
            //         n2: parseInt(Math.random() * (99 - 10) + 10, 10),
            //     },
            // ];
            res.json(respuesta);
        } else {
            res.redirect("/login")
                // res.json({
                //     ok: false,
                //     err: {
                //         message: "Usuario no encontradado",
                //     },
                // });
        }

    });
});

app.post('/API/logind', (req, res) => {
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
        continente: body.fecha,
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
            ok: true,
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
app.get('/API/verifica_cedula/:cedula', (req, res) => {
    let cedulaUsuario = req.params.cedula;
    Usuario.findOne({ cedula: cedulaUsuario }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            res.json({
                ok: false,
                message: "Cedula Encontradado",
            });
        } else {
            res.json({
                ok: true,
                message: "Cedula No encontradado",
            });
        }
    });
});
app.get('/API/verifica_nick/:nombre', (req, res) => {
    let nombreUsuarioA = req.params.nombre;
    Usuario.findOne({ nombreUsuario: nombreUsuarioA }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (usuariosDB) {
            res.json({
                ok: false,
                message: "Cedula Encontradado",
            });
        } else {
            res.json({
                ok: true,
                message: "Cedula No encontradado",
            });
        }
    });
});

module.exports = app;