const Joi = require('joi');

const regex = require('../../config/regex');

module.exports = Joi.object({
    email: Joi.string().regex(RegExp(regex.email)),
    password: Joi.string().regex(RegExp(regex.password)),
    firstname: Joi.string().min(1),
    lastname: Joi.string().min(1),
}).required();
