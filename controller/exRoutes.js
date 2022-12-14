const { createUserSchema } = require("../models/userSchema");

module.exports.ex1 = function(req, res){
    const milli = Date.now();
    const dateEx1 = {
        milliseconds: milli
    };

    let date = new Date();
    dateEx1['dateFormat1'] = date.getDate()+"-"+(date.getMonth()+ 1)+"-"+date.getFullYear();
    dateEx1['dateFormat2'] = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    res.send(dateEx1);
}

module.exports.ex2 = function(req, res){
    const op = {};

    for (let index = 2; index <= 5; index++) {
        for (let k = 1; k < 10; k++) {
            op[`${index} x ${k}`] = (index*k);
        }
    }

    res.send(op);
}

module.exports.ex3 = function(req, res){
    let n = req.query.n;

    const op = {};

    var total = 1; 
	for (i=1; i<=n; i++) {
        total = total * i; 
	}

    op[`Factorial de ${n}`] = total;

    res.send(op);
}

module.exports.ex4 = function(req, res){
    const json = {};

    let operacion = req.query.op;
    let param1 = req.body.param1;
    let param2 = req.body.param2;

    switch (operacion) {
        case 'multiplicacion':
            json[`${param1} x ${param2}`] = param1*param2;
            break;
        case 'suma':
            json[`${param1} + ${param2}`] = param1+param2;
            break;
        case 'resta':
            json[`${param1} - ${param2}`] = param1-param2;
            break;
        case 'division':
            if (param2 == 0) {
                res.status(422).send("0 no aceptado");
            } else {
                json[`${param1} / ${param2}`] = param1/param2;
            }
            break;
    }

    res.send(json);
}


module.exports.ex5 = function(req, res) {
    const json = {};

    let param = req.body.param;
    json.aleatorio = Math.round(Math.random()*param);

    res.send(json);
}

module.exports.ex6 = function(req, res) {
    const json = {};
    let param = req.body.param;
    let arr = [2,4,8,9,7,3,5,6];
    const newArr = arr.map(Element => Element*param);

    

    json.newArr = newArr;
    res.send(json);
}

module.exports.ex7 = function(req, res) {
    const smrtph = {
        modelo: 'a',
        precio: 'b',
        pulgadas: 'c',
        ram: 'd',
        cpu: 'e'
    }
    const smrtph1 = {
        modelo: 'bb',
        precio: 'b',
        pulgadas: 'c',
        ram: 'aaaaaaaaaaaa',
        cpu: 'e'
    };

    let smartphones = [smrtph, smrtph, smrtph, smrtph1];

    const op = req.query.op;
    const newSmtph = req.body;
    const json = {};

    switch (op) {
        case 'add':
            smartphones.push(newSmtph);
            show(json, smartphones);
            break;
        case 'show':
            show(json, smartphones);
            break;
        case 'mod':
            if (newSmtph.modelo == null) {
                json.mensaje = "Envia un json con el siguiente formato: "
                json.formato = {
                    modelo: "Nombre del modelo a modificar",
                    propiedad: "Valor --- La propiedad y el valor de las propiedades a modificar"
                }
                break;
            } else {
                // for (const i of smartphones) {
                //     if (i.modelo == newSmtph.modelo) {
                //         for (const [key, value] of Object.entries(newSmtph)) {
                //             if (key != "modelo") {
                //                 i.key = value;
                //             }
                //         }
                //     }
                // }
                const i = smartphones.findIndex((obj) => obj.modelo === newSmtph.modelo);
                for (const [key, value] of Object.entries(newSmtph)) {
                    if (key != "modelo") {
                        smartphones[i][key] = value;
                    }
                }
                show(json, smartphones);
            }
            break;
        case 'del':
            if (newSmtph.modelo == null) {
                json.mensaje = "Envia un json con el siguiente formato: "
                json.formato = {
                    modelo: "Nombre del modelo a eliminar"
                }
                break;
            } else {
                const objWithIdIndex = smartphones.findIndex((obj) => obj.modelo === newSmtph.modelo);
                smartphones.splice(objWithIdIndex, 1);
                show(json, smartphones);
            }
            break;
    }
    res.send(json);
}

function show(json, smartphones) {
    json["Smartphones"] = smartphones;
}

module.exports.exjoi = function(req, res) {
    res.send('hola');
}

const smrtph = {
    modelo: 'a',
    precio: 'b',
    pulgadas: 'c',
    ram: 'd',
    cpu: 'e'
}
const smrtph1 = {
    modelo: 'bb',
    precio: 'b',
    pulgadas: 'c',
    ram: 'aaaaaaaaaaaa',
    cpu: 'e'
};

let smartphones = [smrtph, smrtph1];
const json = {};

module.exports.show = function(req, res) {
    const op = req.query.op;
    const json = {};
    
    show(json, smartphones);
    res.send(json);
}

module.exports.add = function(req, res) {
    const newSmtph = req.body;
    smartphones.push(newSmtph);
    show(json, smartphones);
    res.send(json);
}

module.exports.update = function(req, res) {
    const newSmtph = req.body;
    if (newSmtph.modelo == null) {
        json.mensaje = "Envia un json con el siguiente formato: "
        json.formato = {
            modelo: "Nombre del modelo a modificar",
            propiedad: "Valor --- La propiedad y el valor de las propiedades a modificar"
        }
    } else {
        const i = smartphones.findIndex((obj) => obj.modelo === newSmtph.modelo);
        for (const [key, value] of Object.entries(newSmtph)) {
            if (key != "modelo") {
                smartphones[i][key] = value;
            }
        }
        
    }
    res.send(json);
}

module.exports.delete = function(req, res) {
    const newSmtph = req.body;
    if (newSmtph.modelo == null) {
        json.mensaje = "Envia un json con el siguiente formato: "
        json.formato = {
            modelo: "Nombre del modelo a eliminar"
        }
    } else {
        const objWithIdIndex = smartphones.findIndex((obj) => obj.modelo === newSmtph.modelo);
        smartphones.splice(objWithIdIndex, 1);
        show(json, smartphones);
    }
    res.send(json);
}

function show(json, smartphones) {
    json["Smartphones"] = smartphones;
}

const userService = require(`../services/userService`);

module.exports.findById = async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
        const userId = req.params.id;
        const responseFromService = await userService.findById(userId);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = `User fetched successfully`;
                responseObj.status = 200;
            } else {
                responseObj.message = `User not found`;
                responseObj.status = 404;
            }
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userController-findById: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};