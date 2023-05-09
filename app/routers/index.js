// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const { userController, loginController, signupController, favoriteController } = require('../controllers');

// Importation des middlewares
const { userOneIsLoggedIn } = require('../middlewares/userIsLoggedIn');

// On préfixe les routers
// get /user/:id pour récupere les infos du user connecté et 
// patch /user/:id pour modifier des infos du user connecté
// delete /user/:id pour supprimer le user
// id est précontrollé avec d+ en regex
router.route('/user/:id(\\d+)')
    .get(userController.getOne)
    .patch(userController.update)
    .delete(userController.delete)
// post /login pour s'enregistrer'
// router.post('/login', loginController);
// post /signup pour créer un compte
// router.post('/signup', signupController);

/**
 * FAVORITE
 */

// Middleware USER LOGGED IN
router.use(userOneIsLoggedIn);

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
