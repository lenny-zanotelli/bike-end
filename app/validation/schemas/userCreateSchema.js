const Joi = require('joi');

const regex = require('../../config/regex');

module.exports = Joi.object({
    email: Joi.string().regex(RegExp(regex.email)).required(),
    password: Joi.string().regex(RegExp(regex.password)).required(),
    firstname: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required(),
    acceptedConditions: Joi.boolean().strict().valid(true).required(),
}).required();
