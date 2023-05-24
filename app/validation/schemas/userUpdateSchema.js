const Joi = require('joi');

const regex = require('../../config/regex');

const pattern = regex.password

module.exports = Joi.object({
    email: Joi.string()
        .email(),
    password: Joi.string()
        .regex(RegExp(pattern))
        .min(8)
        .max(20),
    firstname: Joi.string()
        .min(2),
    lastname: Joi.string()
        .min(2)
}).required();
