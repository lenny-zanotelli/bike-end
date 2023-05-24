const { favoriteDataMapper } = require('../models');

/**
 * @typedef {object} Place
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {object} Favorite
 * @property {string} departure_date_time
 * @property {integer} duration
 * @property {Place} from
 * @property {Place} to
 * @property {integer} nb_transfers
 * @property {string} queryUrl
 * @property {string} comment
 * @property {boolean} isFavorite
 */

/**
 * @typedef {object} Comment
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
    async getAllFavorites(req, res, next) {
        try {
            const favorites = await favoriteDataMapper.findAllByUser(
                req.userId
            );

            if (!favorites) {
                return res.status(400).json('No favorite in Database');
            }

            // On reconstruit la réponse JSON avec les données nécessaires
            const favoriteResults = [];

            favorites.forEach((favorite) => {
                // On remplit notre tableau avec des objets simplifiés pour le front
                favoriteResults.push({
                    departure_date_time: favorite.departure_date_time,
                    duration: favorite.duration,
                    from: {
                        id: favorite.from_id,
                        name: favorite.from_name,
                    },
                    to: {
                        id: favorite.to_id,
                        name: favorite.to_name,
                    },
                    nb_transfers: favorite.nb_transfers,
                    queryUrl: favorite.queryUrl,
                    comment: favorite.comment,
                    isFavorite: true
                });
            });

            // On renvoie le tableau des objets "favorites" en version simplifié et lisible
            return res.status(200).json(favoriteResults);
        } catch (error) {
            error.status = 500;
            error.type = 'fetching favorites';
            next(error);
        }
    },

    /**
     * Favorite controller to get a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getOneFavorite(req, res, next) {
        try {
            const favorite = await favoriteDataMapper.findByPk(
                req.userId,
                req.params.id
            );

            if (!favorite) {
                return res.status(400).json('Favorite not found');
            }

            // On reconstruit la réponse JSON avec les données nécessaires
            const favoriteResult = {
                departure_date_time: favorite.departure_date_time,
                duration: favorite.duration,
                from: {
                    id: favorite.from_id,
                    name: favorite.from_name,
                },
                to: {
                    id: favorite.to_id,
                    name: favorite.to_name,
                },
                nb_transfers: favorite.nb_transfers,
                queryUrl: favorite.queryUrl,
                comment: favorite.comment,
                isFavorite: true
            };

            // On renvoie l'objet "favorite" en version simplifié et lisible
            return res.status(200).json(favoriteResult);
        } catch (error) {
            error.status = 500
            error.type = 'fetching a favorite'
            next(error)
        }
    },

    /**
     * Favorite controller to create a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async addToFavorites(req, res, next) {
        try {
            const favorites = await favoriteDataMapper.findAllByUser(
                req.userId
            );
            // on verifie si le favoris à ajouter existe deja en bdd
            let favorite = favorites.find(
                (favorite) => favorite.queryUrl === req.body.queryUrl
            );
            // si il n'existe pas, on l'y rajoute
            if (!favorite) {
                favorite = await favoriteDataMapper.insert(
                    req.userId,
                    req.body
                );
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            const favoriteResult = {
                departure_date_time: favorite.departure_date_time,
                duration: favorite.duration,
                from: {
                    id: favorite.from_id,
                    name: favorite.from_name,
                },
                to: {
                    id: favorite.to_id,
                    name: favorite.to_name,
                },
                nb_transfers: favorite.nb_transfers,
                queryUrl: favorite.queryUrl,
                comment: favorite.comment,
                isFavorite: true
            };

            // On renvoie l'objet "favorite" en version simplifié et lisible
            return res.status(200).json(favoriteResult);
        } catch (error) {
            error.status = 500;
            error.type = 'adding a favorite';
            next(error);
        }
    },

    /**
     * Favorite controller to update a record
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async modifyComment(req, res, next) {
        try {
            const favoriteToSet = await favoriteDataMapper.findByQueryUrl(req.userId, req._parsedUrl.search);

            if (!favoriteToSet) {
                return res.status(400).json('This favorite does not exist');
            }

            const favoriteToSetOK = await favoriteDataMapper.update(req.userId, req._parsedUrl.search, req.body.comment);

            // On reconstruit la réponse JSON avec les données nécessaires
            const favoriteToSetOKResult = {
                departure_date_time: favoriteToSetOK.departure_date_time,
                duration: favoriteToSetOK.duration,
                from: {
                    id: favoriteToSetOK.from_id,
                    name: favoriteToSetOK.from_name,
                },
                to: {
                    id: favoriteToSetOK.to_id,
                    name: favoriteToSetOK.to_name,
                },
                nb_transfers: favoriteToSetOK.nb_transfers,
                queryUrl: favoriteToSetOK.queryUrl,
                comment: favoriteToSetOK.comment,
                isFavorite: true
            };

            // On renvoie l'objet "favorite" en version simplifié et lisible
            return res.status(200).json(favoriteToSetOKResult);
        } catch (error) {
            error.status = 500
            error.type = 'commenting a favorite'
            next(error)
        }
    },

    /**
     * Favorite controller to delete a record
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async deleteOneFavorite(req, res, next) {
        try {
            const deletedFavorite = await favoriteDataMapper.delete(req.userId, req._parsedUrl.search);

            if (!deletedFavorite) {
                return res.status(400).json('This favorite does not exist');
            }

            return res.status(204).json('Favorite deleted !');
        } catch (error) {
            error.status = 500
            error.type = 'deleting a favorite'
            next(error)
        }
    },
};
