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
    async login(req, res) {
        try {
            // TODO à ajouter en middleware 
            const user = await userDataMapper.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json('Incorrect email or password');
            }
            console.log(user)
            console.log('req.body.password : ',req.body.password)
            console.log('user.password : ',user.password)
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            console.log('isPasswordValid : ',isPasswordValid)
            if (!isPasswordValid){
                return res.status(401).json('Incorrect email or password');
            }
            delete req.body.password

            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete user.password
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
                ...req.body
            };
            const savedUser = await userDataMapper.insert(newUser);
            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete savedUser.password 
            // On renvoie un code 201 = Created
            return res.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
};
