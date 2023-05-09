const { userDataMapper } = require('../models');

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
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user){
            return res.status(400).json('xxxx');
        }
        return res.json(user);
    },
    /**
     * User controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async signup(req, res) {
        // TODO vérif password à basculer dans un middleware validation (JOI)
        if (req.body.password !== req.body.passwordCheck) {
        }
 
        // le req.body contient aussi le passwordCheck donc on ne peut pas utiliser {...req.body}
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        };

        const savedUser = await userDataMapper.insert(newUser);
        return res.json(savedUser);
    },
};
