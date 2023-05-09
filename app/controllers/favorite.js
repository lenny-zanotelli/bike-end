const { favoriteDataMapper } = require('../models');

module.exports = {
    /**
     * Favorite controller to get a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getAllFavorites(req, res) {
        const favorites = await favoriteDataMapper.findAllByUser(req.userId);

        if (!favorites) {
            return res.status(400).json('No favorite in Database');
        }

        return res.json(favorites);
    },

    /**
     * Favorite controller to get a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getOneFavorite(req, res) {
        const favorite = await favoriteDataMapper.findByPk(req.userId, req.params.id);

        if (!favorite) {
            return res.status(400).json('Favorite not found');
        }

        return res.json(favorite);
    },

    /**
     * Favorite controller to create a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async addToFavorites(req, res) {
        const newFavorite = await favoriteDataMapper.insert(req.userId, req.body);

        return res.json(newFavorite);
    },

    /**
     * Favorite controller to update a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async modifyComment(req, res) {
        const favoriteToSet = await favoriteDataMapper.findByPk(req.userId, req.params.id);

        if (!favoriteToSet) {
            return res.status(400).json('This favorite does not exist');
        }

        const favoriteToSetOK = await favoriteDataMapper.update(req.userId, req.params.id, req.body.comment);

        return res.json(favoriteToSetOK);
    },

    /**
     * Favorite controller to delete a record
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async deleteOneFavorite(req, res) {
        const deletedFavorite = await favoriteDataMapper.delete(req.params.id);

        if (!deletedFavorite) {
            return res.status(400).json('This favorite does not exist');
        }

        return res.status(204).json();
    }
};
