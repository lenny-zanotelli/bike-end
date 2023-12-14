const { userDataMapper } = require('../models');

/* BEGINNING : JS DOCS SWAGGER OBJECT DEFINITION */
/**
 * @typedef {object} User l'utilisateur issu de la BDD
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {boolean} accepted_conditions
 */

/**
 * @typedef {object} UserLogin l'utilisateur issu de la BDD
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {object} InputUser
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {boolean} acceptedConditions
 */
/* END : JS DOCS SWAGGER OBJECT DEFINITION */

module.exports = {
    /**
     * User controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getInfo(req, res, next) {
        try {
            const user = await userDataMapper.findByPk(req.userId);
            if (!user) {
                return res.status(400).json('This user does not exist');
            }
            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete user.password;
            // on renvoie un code 200 = success
            return res.status(200).json(user);
        } catch (error) {
            error.status = 500
            error.type = 'fetching user info'
            next(error)
        }
    },

    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async modify(req, res, next) {
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

            // On supprime de notre objet js le password crypté avant de le renvoyer au front en confirmation
            delete savedUser.password;
            // on renvoie un code 200 = success
            return res.status(200).json(savedUser);
        } catch (error) {
            error.status = 500
            error.type = 'modifying user'
            next(error)
        }
    },

    /**
     * User controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res, next) {
        try {
            // deleted sera un booléen TRUE si deletion success
            const deleted = await userDataMapper.delete(req.userId);
            if (!deleted) {
                return res.status(400).json('This user does not exists');
            }
            // on renvoie un code 204 = no content
            return res.status(204).json('User deleted');
        } catch (error) {
            error.status = 500
            error.type = 'deleting user'
            next(error)
        }
    },
};
