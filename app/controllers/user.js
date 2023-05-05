const { userDataMapper } = require('../../models');

/**
 *
 * @param {number} userId ID (PK) of the user searched in DB
 * @returns {object} user
 */
const returnUserByPkIfInDatabase = async (userId) => {
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
        const user = await returnUserByPkIfInDatabase(req.params.id);
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
        const user = await returnUserByPkIfInDatabase(req.params.id);

        if (req.body.email) {
            const userWithSameCredentials = await userDataMapper.isUnique(
                req.body,
                req.params.id
            );
            if (userWithSameCredentials) {
                throw new Error(`Other user already exists with this email`, {
                    statusCode: 400,
                });
            }
        }
        const modifiedUser = {
            email: req.body.email ?? user.email,
            password: req.body.password ?? user.password,
            firstName: req.body.firstName ?? user.firstName,
            lastName: req.body.lastName ?? user.lastName,
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
        const deleted = await userDataMapper.delete(req.params.id);
        if (!deleted) {
            throw new ApiError('This user does not exists', {
                statusCode: 404,
            });
        }

        return res.status(204).json();
    },
};
