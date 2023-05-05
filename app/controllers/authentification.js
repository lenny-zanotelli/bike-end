const { userDataMapper } = require('../models');

/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password 
 * @property {string} firstName 
 * @property {string} lastName
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
        if (req.body.password !== req.body.passwordCheck) {

        }
        const user = await userDataMapper.isUnique(req.body);
        if (user) {
            throw new Error(`User already exists with this email`, { statusCode: 400 });
        }
        

        const savedUser = await userDataMapper.insert(req.body);
        return res.json(savedUser);
    },

};
