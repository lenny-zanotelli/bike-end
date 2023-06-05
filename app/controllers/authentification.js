// Importation des dépendances
const bcrypt = require('bcrypt');

// importation des modules
const { userDataMapper } = require('../models');
const { createTokenForUserId } = require('../services/jwt');

module.exports = {
    /**
     * User controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    login: async (req, res, next) => {
        try {
            // TODO mettre vérif password et email en middleware validation
            const user = await userDataMapper.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json("Wrong email/password pairing");
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).json("Wrong email/password pairing")
            }


            // On genère un token JWT contenant l'id du user
            const token = await createTokenForUserId(user.id);
            // res.setHeader('Authorization', token);

            // on renvoie un code 200 = success avec le token en body
            return res.status(200).json(token);
        } catch (error) {
            error.status = 500
            error.type = 'logging in'
            next(error)
        }
    },

    /**
     * User controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    signup: async (req, res, next) => {
        try {
            const newUser = {
                ...req.body,
            };
            const user = await userDataMapper.insert(newUser);

            // On renvoi un token JWT contenant l'id du user
            const token = await createTokenForUserId(user.id);

            // On renvoie un code 201 = Created
            return res.status(201).json(token);
        } catch (error) {
            error.status = 500
            error.type = 'signing up'
            next(error)
        }
    },
};
