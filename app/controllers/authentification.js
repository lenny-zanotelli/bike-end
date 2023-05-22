// Importation des dépendances
const bcrypt = require('bcrypt');

// importation des modules
const { userDataMapper } = require('../models');
const { createTokenForUserId } = require('../services/jwt');

/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {boolean} accepted_conditions
 */

/**
 * User controller to get a record.
 * ExpressMiddleware signature
 * @param {object} req Express req.object
 * @param {object} res Express response object
 * @returns Route API JSON response
 */

module.exports = {
    login: async (req, res) => {
        try {
            // TODO mettre vérif password et email en middleware validation
            const user = await userDataMapper.findByEmail(req.body.email);
            if (!user) {
                throw new Error("Email unknown");
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) {
                throw new Error("Wrong email/password pairing")
            }


            // On renvoi un token JWT contenant l'id du user
            const token = await createTokenForUserId(user.id);
            // res.setHeader('Authorization', token);

            // on renvoie un code 200 = success
            return res.status(200).json(token);
        } catch (error) {
            console.error(error);
            return res.status(401).json('Access denied');;
        }
    },
    /**
     * User controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    signup: async (req, res) => {
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
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
};
