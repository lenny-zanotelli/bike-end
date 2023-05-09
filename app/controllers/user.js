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
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getUser(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user) {
            return res.status(400).json('This user does not exist');
        }
        return res.json(user);
    },
    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async updateUserInfo(req, res) {
        const userInDB = await userDataMapper.findByPk(req.params.id);
        if (!userInDB) {
            return res.status(400).json('This user does not exist');
        }

        // completer l'user avec les elements de la bdd, modifiés de ce qui est dans le user
        const modifiedUser = {
            ...userInDB,
            ...req.body
        };
        const savedUser = await userDataMapper.update(
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
    async deleteUser(req, res) {
        // deleted sera un booléen TRUE si deletion success
        const deleted = await userDataMapper.delete(req.params.id);
        if (!deleted) {
            return res.status(400).json('This user does not exists');
        }

        return res.status(204).json();
    },
};
