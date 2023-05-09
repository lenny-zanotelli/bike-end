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
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const user = await returnRecordOrThrowError(req.params.id);
        return res.json(user);
    },
    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const userInDB = await returnRecordOrThrowError(req.params.id);
        // Si l'email fait parti des éléments mis à jour, on check si cet email n'est pas utilisé par un autre user
        if (req.body.email) {
            const userWithSameCredentials = await userDataMapper.isEmailUnique(
                req.body.email,
                req.params.id
            );
            if (userWithSameCredentials) {
                throw new Error(`Other user already exists with this email`, {
                    statusCode: 400,
                });
            }
        }
        // completer l'user avec les elements de la bdd, modifiés de ce qui est dans le user
        const modifiedUser = {
            ...userInDB,
            ...req.body
        };
        const savedUser = await userDataMapper.update(
            req.params.id,
            modifiedUser
        );
        return res.json(savedUser);
    },

    /**
     * User controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        // deleted sera un booléen TRUE si deletion success
        const deleted = await userDataMapper.delete(req.params.id);
        if (!deleted) {
            throw new ApiError('This user does not exists', {
                statusCode: 404,
            });
        }

        return res.status(204).json();
    },
};
