// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const {
    userController,
    authentificationController,
} = require('../controllers');
const { isUserUnique } = require('../middlewares/isUserUnique');

// On préfixe les routers
// get /user/:id pour récupere les infos du user connecté et
// patch /user/:id pour modifier des infos du user connecté
// delete /user/:id pour supprimer le user
// id est précontrollé avec d+ en regex
// TODO replace /:id by /me in order to obfuscate db user id
router
    .route('/user/:id(\\d+)')
    .get(userController.getUser)
    .patch(isUserUnique, userController.updateUserInfo)
    .delete(userController.deleteUser);
// post /login pour s'enregistrer'
// TODO - do controller
// router.post('/login', authentificationController.login);
// post /signup pour créer un compte
router.post('/signup',isUserUnique, authentificationController.signup);

module.exports = router;
