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
    async getInfo(req, res) {
        try {
            const user = await userDataMapper.findByPk(req.userId);
            if (!user) {
                return res.status(400).json('This user does not exist');
            }
            return res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async modify(req, res) {
        try {
            const userInDB = await userDataMapper.findByPk(req.userId);
            if (!userInDB) {
                return res.status(400).json('This user does not exist');
            }
            // completer le user avec les elements de la bdd, modifiés de ce qui est dans le user
            const modifiedUser = {
                ...userInDB,
                ...req.body,
            };
            const savedUser = await userDataMapper.update(modifiedUser);
            return res.json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    /**
     * User controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        try {
            // deleted sera un booléen TRUE si deletion success
            const deleted = await userDataMapper.delete(req.userId);
            if (!deleted) {
                return res.status(400).json('This user does not exists');
            }
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
};
