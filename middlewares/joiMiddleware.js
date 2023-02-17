module.exports.joiValidate = (schema, validation) => {
    return (req, res, next) => {
        let objToValidate;
        if (validation === 'body') objToValidate = req.body;
        if (validation === 'params') objToValidate = req.params;
        if (validation === 'query') objToValidate = req.query;

        const result = schema.validate(objToValidate);

        if (result.error){
            const errorMessages = result.error.details.map(error => error.message);
            res.status(400).send(errorMessages);
        }else {
            next();
        }
    }
}