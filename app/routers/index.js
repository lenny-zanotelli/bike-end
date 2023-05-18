// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const { userController, authentificationController, favoriteController, autoCompleteController, journeyController } = require('../controllers/');

// Importation de la validation par JOI
const validate = require('../validation/validator');
const createSchema = require('../validation/schemas/userCreateSchema');
const loginSchema = require('../validation/schemas/userLoginSchema');
const updateSchema = require('../validation/schemas/userUpdateSchema');

// Importation des middlewares
// TODO replace passwordCheck by JOI
const { encryptPwd, jwtAuth, isUserUnique } = require('../middlewares');

// post /login pour se connecter
router.post('/login', [validate('body', loginSchema)], authentificationController.login);

// post /signup pour créer un compte
router.post('/signup', [validate('body', createSchema), isUserUnique, encryptPwd], authentificationController.signup);

// Middleware vérifiant le token JWT afin d'authoriser
// une connexion aux routes et désignant le user signed in (req.userId)
router.use(jwtAuth)

/**
 * USER
 */

router.route('/user')
    .get(userController.getInfo)
    .patch([validate('body', updateSchema), isUserUnique, encryptPwd], userController.modify)
    .delete(userController.delete);

/**
 * FAVORITE
 */

// GET/POST - /favorite
router.route('/favorite')
    // On récupère tous les favoris
    .get(favoriteController.getAllFavorites)
    // On ajoute un favori
    .post(favoriteController.addToFavorites);

// GET/PATCH/DELETE - /favorite/:id
router.route('/favorite/:id(\\d+)')
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
router.route('/search/:place')
    .get(autoCompleteController.getPlacesByQuery);
// On récupère les suggestions d'itinéraires après choix du lieu de départ
router.route('/search/journeys/:from/:datetime/:maxduration')
    .get(journeyController.getJourneysByPlace);

module.exports = router;
