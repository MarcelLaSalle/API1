const { not } = require("joi");
const Joi = require("joi");
Joi.objectId = require(`joi-objectid`)(Joi);

module.exports.create = Joi.object({
    aeropuertoOrigen: Joi.string().regex(/^[a-zA-Z\s]+$/).max(10).required(),
    aeropuertoDestino: Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
    fechaSalida: Joi.date().required(),
    fechaLlegada: Joi.date().required(),
    precio: Joi.number().precision(2).min(0).max(9999.99).required(),
    nombrePasajero: Joi.string().alphanum().max(300).required()
});

module.exports.tripIdSchema = Joi.object({
    id: Joi.objectId().required()
});

module.exports.update = Joi.object({
    aeropuertoOrigen: Joi.string().regex(/^[a-zA-Z\s]+$/).max(10).optional(),
    aeropuertoDestino: Joi.string().regex(/^[a-zA-Z\s]+$/).optional(),
    fechaSalida: Joi.date().optional(),
    fechaLlegada: Joi.date().optional(),
    precio: Joi.number().precision(2).min(0).max(9999.99).optional(),
    nombrePasajero: Joi.string().alphanum().max(300).optional()
});
