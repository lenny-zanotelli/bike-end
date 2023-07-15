const express = require('express');
const router = express.Router();

// Importation des controllers
const { autoCompleteController, journeyController } = require('../controllers/');

// Importation des middlewares
const { maxDuration, fetchAndCacheJourneys } = require('../middlewares');

/**
 * SEARCH
 */

// On récupère les suggestions de lieux en auto-complete
router
    .route('/autocomplete/:place')
    /**
     * GET /autocomplete/:place
     * @tags 2.Search - everything about search
     * @summary to get a list of places with auto-completion
     * @param {string} place.path personalized place
     * @return {array<Place>} 200 - success response
     * @example response - 200 - success response Array of Places example
     * [
     *   {
     *     "id": "stop_area:STE:OCE87389882",
     *     "name": "Marans Place du Marquis d'Aligre (Marans) [17230]"
     *   },
     *   {
     *     "id": "2.3793433;48.8504715",
     *     "name": "Rue d'Aligre (Paris) [75012]"
     *   }
     * ]
     * @return {ValidationError} 400 - bad input data
     */
    .get(autoCompleteController.getPlacesByQuery);

// On récupère les suggestions d'itinéraires après choix du lieu de départ
router
    .route('/journey/search*')
    /**
     * GET /journey/search*
     * @tags 2.Search - everything about search
     * @summary to get a list of journeys by a selected place
     * @param {string} from.query is equal to the Place.id
     * @param {string} datetime.query "YYYYMMDDThhmmss" format
     * @param {integer} max_duration.query limited to 3600 secondes for the moment
     * @param {integer} per_page.query max quantity of objects in a page
     * @param {string} current_page.query page's number you want
     * @return {array<Journey>} 200 - success response
     * @example response - 200 - success response Array of Journeys example
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
     *     "comment": null,
     *     "isFavorite": false
     *   },
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
     *     "isFavorite": false
     *   }
     * ]
     * @return {ValidationError} 400 - bad input data
     */
    .get(
        maxDuration,
        fetchAndCacheJourneys,
        journeyController.getJourneysByFilters
    );

// On récupère un itinéraire détaillé après choix dans la liste des suggestions
router
    .route('/journey/detail*')
    /**
     * GET /journey/detail*
     * @tags 2.Search - everything about search
     * @summary to get a detailled journey by a selected journey
     * @param {string} queryUrl.query is equal to the Journey.queryUrl
     * @return {JourneyDetail} 200 - success response
     * @example response - 200 - success response JourneyDetail example
     *   {
     *     "departure_date_time": "20230603T120000",
     *     "arrival_date_time": "20230603T120900",
     *     "duration": 540,
     *     "nb_transfers": 1,
     *     "from": {
     *       "id": "2.3786875;48.8486506",
     *       "name": "17 Place d'Aligre (Paris)"
     *     },
     *     "to": {
     *       "id": "stop_point:IDFM:22496",
     *       "name": "Charonne - Keller (Paris)"
     *     },
     *     "sections": [
     *                   {
     *                     "departure_date_time": "20230603T120000",
     *                     "arrival_date_time": "20230603T120900",
     *                     "duration": 300,
     *                     "from": {
     *                               "id": "2.3786875;48.8486506",
     *                               "name": "17 Place d'Aligre (Paris)"
     *                     },
     *                     "to": {
     *                             "id": "stop_point:IDFM:22496",
     *                             "name": "Charonne - Keller (Paris)"
     *                     },
     *                     "transportMode": "public_transport"
     *                   },
     *                   {
     *                     "departure_date_time": "20230603T120000",
     *                     "arrival_date_time": "20230603T120900",
     *                     "duration": 240,
     *                     "from": {
     *                               "id": "2.3786875;48.8486506",
     *                               "name": "17 Place d'Aligre (Paris)"
     *                     },
     *                     "to": {
     *                             "id": "stop_point:IDFM:22496",
     *                             "name": "Charonne - Keller (Paris)"
     *                     },
     *                     "transportMode": "street_network"
     *                   }
     *     ]
     *   }
     * @return {ValidationError} 400 - bad input data
     */
    .get(journeyController.getJourneyDetails);

module.exports = router;
