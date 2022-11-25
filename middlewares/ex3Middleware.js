module.exports.checkNumberQueryParam = (req, res, next) => {
    const response = {};

    if (req.query.n){
        if (!Number.isNaN(Number(req.query.n))){
            next();
        } else {
            response.error = "NaN";
        }
    } else {
        response.error = "Not defined";
    }

    res.status(400).send(response);
}

module.exports.checkParamEqualsPassword = (req, res, next) =>{
    const pass = req.body.pass;
    const response = {};

    if (pass) {
        if (typeof pass == 'string') {
            if (pass == 'mi-caja-fuerte') {
                next();
            } else {
                response.error = "Contraseña incorrecta";
            }
        } else {
            response.error = "Not a string";
        }
    } else {
        response.error = "Not defined";
    }

    res.status(400).send(response);
}