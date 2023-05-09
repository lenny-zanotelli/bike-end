// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des controllers
const {
    userController,
    authentificationController,
} = require('../controllers');

// TODO replace userOneIsLoggedIn by JWT
// TODO replace passwordCheck by JOI
const { encryptPwd, passwordCheck, userOneIsLoggedIn, isUserUnique} = require('../middlewares');

// post /login pour s'enregistrer'
// TODO - do controller
router.post('/login', authentificationController.login);
// post /signup pour créer un compte
router.post('/signup',isUserUnique, passwordCheck, encryptPwd, authentificationController.signup);

router.use(userOneIsLoggedIn)
router
    .route('/user')
    .get(userController.getInfo)
    .patch(isUserUnique, encryptPwd, userController.modify)
    .delete(userController.delete);

module.exports = router;
