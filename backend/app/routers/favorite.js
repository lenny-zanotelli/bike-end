const express = require('express');
const router = express.Router();

// Importation des controllers
const { favoriteController } = require('../controllers/');

/**
 * FAVORITE ROUTER
 */

router
    .route('/favorite*')
    // On récupère tous les favoris
    /**
     * GET /favorite
     * @tags 3.Favorite - everything about favorite
     * @summary to get all the favorites
     * @return {array<Favorite>} 200 - success response - application/json
     * @example response - 200 - success response Array of Favorites example
     * [
     *   {
     *     "departure_date_time": "20230603T120000",
     *     "duration": 540,
     *     "from": {
     *       "id": "2.3786875;48.8486506",
     *       "name": "17 Place d'Aligre (Paris)"
     *     },
     *     "to": {
     *       "id": "stop_point:IDFM:22496",
     *       "name": "Charonne - Keller (Paris)"
     *     },
     *     "nb_transfers": 1,
     *     "queryUrl": "?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A22496",
     *     "comment": "Good trip !",
     *     "isFavorite": true
     *   },
     *   {
     *     "departure_date_time": "20230603T180000",
     *     "duration": 670,
     *     "from": {
     *       "id": "2.3786875;48.8486506",
     *       "name": "17 Place d'Aligre (Paris)"
     *     },
     *     "to": {
     *       "id": "stop_point:IDFM:22496",
     *       "name": "Charonne - Keller (Paris)"
     *     },
     *     "nb_transfers": 1,
     *     "queryUrl": "?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A22496",
     *     "comment": null,
     *     "isFavorite": true
     *   }
     * ]
     * @return {ValidationError} 400 - bad input data
     */
    .get(favoriteController.getAllFavorites)
    // On ajoute un favori
    /**
     * POST /favorite
     * @tags 3.Favorite - everything about favorite
     * @summary to add a journey as favorite
     * @param {Journey} request.body.required
     * @return {Favorite} 200 - success response - application/json
     * @example response - 200 - success response new Favorite example
     *   {
     *     "departure_date_time": "20230603T120000",
     *     "duration": 540,
     *     "from": {
     *       "id": "2.3786875;48.8486506",
     *       "name": "17 Place d'Aligre (Paris)"
     *     },
     *     "to": {
     *       "id": "stop_point:IDFM:22496",
     *       "name": "Charonne - Keller (Paris)"
     *     },
     *     "nb_transfers": 1,
     *     "queryUrl": "?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A22496",
     *     "comment": null,
     *     "isFavorite": true
     *   }
     * @return {ValidationError} 400 - bad input data
     */
    .post(favoriteController.addToFavorites)
    // On modifie un favori
    /**
     * PATCH /favorite*
     * @tags 3.Favorite - everything about favorite
     * @summary to modify the comment field of a favorite
     * @param {string} queryUrl.query
     * @param {Comment} request.body.required
     * @return {Favorite} 200 - success response - application/json
     * @example response - 200 - success response Favorite modified example
     *   {
     *     "departure_date_time": "20230603T120000",
     *     "duration": 540,
     *     "from": {
     *       "id": "2.3786875;48.8486506",
     *       "name": "17 Place d'Aligre (Paris)"
     *     },
     *     "to": {
     *       "id": "stop_point:IDFM:22496",
     *       "name": "Charonne - Keller (Paris)"
     *     },
     *     "nb_transfers": 1,
     *     "queryUrl": "?from=2.3786875%3B48.8486506&datetime=20230603T120000&max_duration=3600&to=stop_point%3AIDFM%3A22496",
     *     "comment": "Very good trip !",
     *     "isFavorite": true
     *   }
     * @return {ValidationError} 400 - bad input data
     */
    .patch(favoriteController.modifyComment)
    // On supprime un favori par son queryUrl
    /**
     * DELETE /favorite*
     * @tags 3.Favorite - everything about favorite
     * @summary to delete a favorite by its queryUrl
     * @param {string} queryUrl.query
     * @return {ValidationError} 400 - bad input data
     */
    .delete(favoriteController.deleteOneFavorite);

module.exports = router;
