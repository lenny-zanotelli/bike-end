// Importation des dépendances
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importation des modules
const { userDataMapper } = require('../models');
const { createToken } = require('../services/jwt');
/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 */

module.exports = {
    /**
     * User controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async login(req, res) {
        try {
            // TODO mettre vérif password et email en middleware validation
            const user = await userDataMapper.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json('Incorrect email or password');
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).json('Incorrect email or password');
            }

            
            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete user.password;

            // On ajoute en header un token JWT contenant les informations du user
            const token = createToken(user);
            res.setHeader('Authorization', token);

            // on renvoie un code 200 = success
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
    /**
     * User controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async signup(req, res) {
        try {
            const newUser = {
                ...req.body,
            };
            const user = await userDataMapper.insert(newUser);
            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete user.password;

            // On ajoute en header un token JWT contenant les informations du user
            const token = createToken(user);
            res.setHeader('Authorization', token);

            // On renvoie un code 201 = Created
            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
};
