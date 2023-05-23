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
const { encryptPwd, jwtAuth, isUserUnique, maxDuration } = require('../middlewares');
const { paginate } = require('../middlewares/paginate');

// post /login pour se connecter
router.post(
    '/login',
    [validate('body', loginSchema)],
    authentificationController.login
);

// post /signup pour créer un compte
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
    .get(userController.getInfo)
    .patch(
        [validate('body', updateSchema), isUserUnique, encryptPwd],
        userController.modify
    )
    .delete(userController.delete);

/**
 * FAVORITE
 */

// GET/POST - /favorite
router
    .route('/favorite')
    // On récupère tous les favoris
    .get(favoriteController.getAllFavorites)
    // On ajoute un favori
    .post(favoriteController.addToFavorites); 
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
    .get(favoriteController.getOneFavorite)
    // On modifie un favori
    .patch(favoriteController.modifyComment)
    // On supprime un favori
    .delete(favoriteController.deleteOneFavorite);

/**
 * SEARCH
 */

// router.get('/search/*', searchController)

// On récupère les suggestions de lieux en auto-complete
router
    .route('/autocomplete/:place')
    .get(autoCompleteController.getPlacesByQuery);

// V.PP On récupère les suggestions d'itinéraires après choix du lieu de départ
router
    .route('/journey/search*')
    .get(maxDuration, paginate, journeyController.getJourneysByFilters);

// V.PP On récupère un itinéraire détaillé après choix dans la liste des suggestions
router
    .route('/journey/detail*')
    .get(journeyController.getJourneyDetails);

module.exports = router;
