const Joi = require('joi');

const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

module.exports = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .regex(RegExp(pattern))
        .min(8)
        .max(20)
        .required(),
    firstname: Joi.string()
        .min(2)
        .required(),
    lastname: Joi.string()
        .min(2)
        .required(),
    acceptedConditions: Joi.boolean()
        .strict()
        .valid(true)
        .required()
}).required();
