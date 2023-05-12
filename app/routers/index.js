// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const { userController, authentificationController, favoriteController } = require('../controllers/');

// Importation de la validation par JOI
const validate = require('../validation/validator');
const createSchema = require('../validation/schemas/userCreateSchema');
const loginSchema = require('../validation/schemas/userLoginSchema');
const updateSchema = require('../validation/schemas/userUpdateSchema');

// Importation des middlewares
// TODO replace passwordCheck by JOI
const { encryptPwd, passwordCheck, jwtAuth, isUserUnique } = require('../middlewares');

// post /login pour se connecter
router.route('/login')
    .post(validate('body', loginSchema), authentificationController.login);
// post /signup pour créer un compte
router.route('/signup')
    .post(validate('body', createSchema), [isUserUnique, passwordCheck, encryptPwd], authentificationController.signup);

// Middleware vérifiant le token JWT afin d'authoriser
// une connexion aux routes et désignant le user signed in (req.userId)
router.use(jwtAuth)

/**
 * USER
 */

router.route('/user')
    .get(userController.getInfo)
    .patch(validate('body', updateSchema), [isUserUnique, encryptPwd], userController.modify)
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

module.exports = router;
