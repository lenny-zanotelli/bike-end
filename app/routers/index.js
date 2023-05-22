// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const {
    userController,
    authentificationController,
    favoriteController,
    autoCompleteController,
    journeyController,
} = require('../controllers/');

// Importation de la validation par JOI
const validate = require('../validation/validator');
const createSchema = require('../validation/schemas/userCreateSchema');
const loginSchema = require('../validation/schemas/userLoginSchema');
const updateSchema = require('../validation/schemas/userUpdateSchema');

// Importation des middlewares
// TODO replace passwordCheck by JOI
const { encryptPwd, jwtAuth, isUserUnique } = require('../middlewares');
const { maxTime, maxDuration } = require('../middlewares/maxTime');

// post /login pour se connecter
/**
 * POST /login
 * @summary to get connected with email and password
 * @param {User} request.body.required
 * @return {User} 200 - success response
 * @return {ValidationError} 400 - bad input data
 */
router.post(
    '/login',
    [validate('body', loginSchema)],
    authentificationController.login
);

// post /signup pour créer un compte
/**
 * POST /signup
 * @summary to create an account with email, password, firstname and lastname
 * @param {User} request.body.required
 * @return {User} 200 - success response
 * @return {ValidationError} 400 - bad input data
 */
router.post(
    '/signup',
    [validate('body', createSchema), isUserUnique, encryptPwd],
    authentificationController.signup
);

// Middleware vérifiant le token JWT afin d'authoriser
// une connexion aux routes et désignant le user signed in (req.userId)
router.use(jwtAuth);

/**
 * USER
 */

router
    .route('/user')
    /**
     * GET /user
     * @summary to get user informations
     * @param {User} 
     * @return {User} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(userController.getInfo)
    /**
     * PATCH /user
     * @summary to modify user informations
     * @param {User} request.body.required
     * @return {User} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .patch(
        [validate('body', updateSchema), isUserUnique, encryptPwd],
        userController.modify
    )
    /**
     * DELETE /user
     * @summary to delete user account
     * @param {User} 
     * @return {User} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .delete(userController.delete);

/**
 * FAVORITE
 */

// GET/POST - /favorite
router
    .route('/favorite')
    // On récupère tous les favoris
    /**
     * GET /favorite
     * @summary to get all the favorites
     * @param {} 
     * @return {Favorite} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(favoriteController.getAllFavorites)
    // On ajoute un favori
    /**
     * POST /favorite
     * @summary to add a journey as favorite
     * @param {Journey} request.body.required
     * @return {Favorite} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .post(favoriteController.addToFavorites); // ---->     (body {link/from/to/autres})
// {
//     "departure_date_time": "20230517T180000",
//     "duration": "480",
//     "from_name": "9 Place d'Aligre (Paris)",
//     "from_id": "2.378441;48.84916",
//     "to_name": "Faidherbe - Chaligny (Paris)",
//     "to_id": "stop_point:IDFM:463172",
//     "link": "https://api.navitia.io/v1/journeys?from=2.37825371181375%3B48.84915325462162&datetime=20230517T180000&max_duration=1200&to=stop_point%3AIDFM%3A463172"
//   }

// GET/PATCH/DELETE - /favorite/:id
router
    .route('/favorite/:id(\\d+)')
    // On récupère un favori
    /**
     * GET /favorite/:id
     * @summary to get one favorite by its id
     * @param {id} 
     * @return {Favorite} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(favoriteController.getOneFavorite)
    // On modifie un favori
    /**
     * PATCH /favorite/:id
     * @summary to modify the comment field of a favorite
     * @param {id, Favorite} request.body.required
     * @return {Favorite} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .patch(favoriteController.modifyComment)
    // On supprime un favori
    /**
     * DELETE /favorite/:id
     * @summary to delete a favorite by its id
     * @param {id} 
     * @return {} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .delete(favoriteController.deleteOneFavorite);

/**
 * SEARCH
 */

// router.get('/search/*', searchController)

// On récupère les suggestions de lieux en auto-complete
router
    .route('/autocomplete/:place')
    /**
     * GET /autocomplete/:place
     * @summary to get a list of places with auto-completion
     * @param {place} 
     * @return {Place} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(autoCompleteController.getPlacesByQuery);

// V.PP On récupère les suggestions d'itinéraires après choix du lieu de départ
router
    .route('/journey/search*') // ---- > get search/journeys .... searchParams
    /**
     * GET /journey/search*
     * @summary to get a list of journeys by a selected place
     * @param {searchParams} 
     * @return {Journey} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(maxDuration, journeyController.getJourneysByFilters);

// V.PP On récupère un itinéraire détaillé après choix dans la liste des suggestions
router
    .route('/journey/detail*') //  ---->  search/details  (body {link})
    /**
     * GET /journey/detail*
     * @summary to get a detailled journey by a selected journey
     * @param {searchParams} 
     * @return {Journey} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(journeyController.getJourneyDetails);

module.exports = router;
