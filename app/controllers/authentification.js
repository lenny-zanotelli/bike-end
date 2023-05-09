const { userDataMapper } = require('../models');

/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 */

/**
 *
 * @param {number} userId ID (PK) of the user searched in DB
 * @returns {User}
 */
const returnRecordOrThrowError = async (userId) => {
    const user = await userDataMapper.findByPk(userId);
    if (!user) {
        throw new Error('This user does not exists', {
            statusCode: 404,
        });
    }
    return user;
};

module.exports = {
    /**
     * User controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async login(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
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
        // TODO à basculer dans un middleware - JOI
        if (req.body.password !== req.body.passwordCheck) {
        }
        const user = await userDataMapper.isUnique(req.body);
        if (user) {
            throw new Error(`User already exists with this email`, {
                statusCode: 400,
            });
        }
        // le req.body contient aussi le passwordCheck
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
