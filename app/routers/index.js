// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const {
    userController,
    authentificationController,
} = require('../controllers');
const { isUserUnique } = require('../middlewares/isUserUnique');

// TODO replace userOneIsLoggedIn by JWT
const { userOneIsLoggedIn } = require('../middlewares/userOneIsLoggedIn');

// post /login pour s'enregistrer'
// TODO - do controller
// router.post('/login', authentificationController.login);
// post /signup pour créer un compte
router.post('/signup',isUserUnique, authentificationController.signup);

router.use(userOneIsLoggedIn)
router
    .route('/user')
    .get(userController.getInfo)
    .patch(isUserUnique, userController.modify)
    .delete(userController.delete);

module.exports = router;
