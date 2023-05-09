const { userDataMapper } = require('../models');
const bcrypt = require('bcrypt')
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
    // TODO login
    async login(req, res) {
        try {
            // TODO à ajouter en middleware 
            const user = await userDataMapper.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json('Incorrect email or password');
            }
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid){
                return res.status(401).json('Incorrect email or password');
            }
            delete req.body.password

             // On supprime de notre objet JS le password crypté avant de le renvoyer au front en confirmation
            delete user.password
            return res.json(user);
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
                ...req.body
            };
            // On supprime de newUser le pswdCheck qui n'ira pas en BDD
            delete newUser.passwordCheck
            // On crypte le password avant de l'insérer en BDD
            newUser.password = await bcrypt.hash(newUser.password, 10)
            const savedUser = await userDataMapper.insert(newUser);
            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete savedUser.password 
            return res.json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
};
