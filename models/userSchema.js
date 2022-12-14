const { not } = require("joi");
const Joi = require("joi");
Joi.objectId = require(`joi-objectid`)(Joi);

module.exports.createUserSchema = Joi.object({
    //1: name: Joi.string().regex(/[a-zA-Z]/).max(20).min(3)
    job: Joi.string().alphanum().max(50).min(5),
    birthday: Joi.date().iso().greater("1/1/2000"),
    username: Joi.string().alphanum().max(20).min(3),
    mail: Joi.string().email().max(30).min(5).when('username', {is: !null, then: Joi.required}),
    password: Joi.string().regex(new RegExp("/^[a-zA-Z0-9]{3,30}$/")).required(),
    repeat_password: Joi.string().when('username', {is: !null, then: Joi.required}).when('username', {is: !null, then: Joi.required})
    }
)

module.exports.userIdSchema = Joi.object({
    id: Joi.objectId().required()
});
