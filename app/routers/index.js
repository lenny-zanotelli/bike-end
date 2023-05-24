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
const {
    encryptPwd,
    jwtAuth,
    isUserUnique,
    maxDuration,
    errorHandler,
    paginateAndCacheJourneys,
} = require('../middlewares');

// post /login pour se connecter
/**
 * POST /login
 * @tags 1.User - everything about user
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
 * @tags 1.User - everything about user
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
     * @tags 1.User - everything about user
     * @summary to get user informations
     * @security bearerAuth
     * @return {User} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(userController.getInfo)
    /**
     * PATCH /user
     * @tags 1.User - everything about user
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
     * @tags 1.User - everything about user
     * @summary to delete user account
     * @return {User} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .delete(userController.delete);

/**
 * FAVORITE
 */

// ? to delete, unused
// // GET - /favorite/:id
// router
//     .route('/favorite/:id')
//     // On récupère un favori
//     /**
//      * GET /favorite/:id
//      * @tags 3.Favorite - everything about favorite
//      * @summary to get one favorite by its id
//      * @param {string} id.path
//      * @return {Favorite} 200 - success response
//      * @return {ValidationError} 400 - bad input data
//      */
//     .get(favoriteController.getOneFavorite);

router
    .route('/favorite*')
    // On récupère tous les favoris
    /**
     * GET /favorite
     * @tags 3.Favorite - everything about favorite
     * @summary to get all the favorites
     * @return {Favorite} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(favoriteController.getAllFavorites)
    // On ajoute un favoris
    /**
     * POST /favorite
     * @tags 3.Favorite - everything about favorite
     * @summary to add a journey as favorite
     * @param {Journey} request.body.required
     * @return {Favorite} 200 - success response
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
     * @return {Favorite} 200 - success response
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
     * @return {Place} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(autoCompleteController.getPlacesByQuery);

// V.PP On récupère les suggestions d'itinéraires après choix du lieu de départ
router
    .route('/journey/search*')
    /**
     * GET /journey/search*
     * @tags 2.Search - everything about search
     * @summary to get a list of journeys by a selected place
     * @param {string} from.query is equal to the Place.id
     * @param {string} datetime.query "YYYYMMDDThhmmss" format
     * @param {integer} max_duration.query limited to 3600 secondes for the moment
     * @param {integer} per_page.query
     * @param {string} current_page.query
     * @return {Journey} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(
        maxDuration,
        paginateAndCacheJourneys,
        journeyController.getJourneysByFilters
    );

// V.PP On récupère un itinéraire détaillé après choix dans la liste des suggestions
router
    .route('/journey/detail*')
    /**
     * GET /journey/detail*
     * @tags 2.Search - everything about search
     * @summary to get a detailled journey by a selected journey
     * @param {string} queryUrl.query is equal to the Journey.queryUrl
     * @return {JourneyDetail} 200 - success response
     * @return {ValidationError} 400 - bad input data
     */
    .get(journeyController.getJourneyDetails);

router.use(errorHandler);
module.exports = router;
