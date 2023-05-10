// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const { userController, authentificationController, favoriteController } = require('../controllers');

// Importation des middlewares

// TODO replace passwordCheck by JOI
const { encryptPwd, passwordCheck, jwtAuth, isUserUnique} = require('../middlewares');

// post /login pour s'enregistrer'
router.post('/login', authentificationController.login);
// post /signup pour créer un compte
router.post('/signup',[isUserUnique, passwordCheck, encryptPwd], authentificationController.signup);

// Middleware vérifiant le token JWT afin d'authoriser 
// une connection aux routes et désignant le user signed in (req.userId)
router.use(jwtAuth)

/**
 * USER
 */

router
    .route('/user')
    .get(userController.getInfo)
    .patch([isUserUnique, encryptPwd], userController.modify)
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

module.exports = router;