const { favoriteDataMapper } = require('../models');

/**
 * @typedef {object} Journey
 * @property {number} id - Identifiant unique, Pk de la table
 * @property {string} departure_date_time
 * @property {integer} duration
 * @property {string} from_name
 * @property {string} from_id
 * @property {string} to_name
 * @property {string} to_id
 * @property {integer} nb_transfers
 * @property {string} queryUrl
 * @property {string} comment
 */

module.exports = {
    /**
     * Favorite controller to get a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getAllFavorites(req, res) {
        try {
            const favorites = await favoriteDataMapper.findAllByUser(req.userId);

            if (!favorites) {
                return res.status(400).json('No favorite in Database');
            }

            return res.status(200).json(favorites);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    /**
     * Favorite controller to get a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getOneFavorite(req, res) {
        try {
            const favorite = await favoriteDataMapper.findByPk(req.userId, req.params.id);

            if (!favorite) {
                return res.status(400).json('Favorite not found');
            }

            return res.status(200).json(favorite);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    /**
     * Favorite controller to create a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async addToFavorites(req, res) {
        try {
            const newFavorite = await favoriteDataMapper.insert(req.userId, req.body);

            return res.status(200).json(newFavorite);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    /**
     * Favorite controller to update a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async modifyComment(req, res) {
        try {
            const favoriteToSet = await favoriteDataMapper.findByPk(req.userId, req.params.id);

            if (!favoriteToSet) {
                return res.status(400).json('This favorite does not exist');
            }

            const favoriteToSetOK = await favoriteDataMapper.update(req.userId, req.params.id, req.body.comment);

            return res.status(200).json(favoriteToSetOK);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    /**
     * Favorite controller to delete a record
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async deleteOneFavorite(req, res) {
        try {
            const deletedFavorite = await favoriteDataMapper.delete(req.userId, req.params.id);

            if (!deletedFavorite) {
                return res.status(400).json('This favorite does not exist');
            }

            return res.status(204).json('Favorite deleted !');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    }
};
