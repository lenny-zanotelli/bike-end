// Importation des dépendances
const express = require('express');
const router = express.Router();

// Importation des middlewares
const { errorHandler } = require('../middlewares');

// Importation des routers
const favoriteRouter = require('./favorite');
const searchRouter = require('./search');
const userRouter = require('./user');

// On déclenche les routers
router.use('/', userRouter, searchRouter, favoriteRouter);

router.use(errorHandler);

module.exports = router;

Prestation d’assistance à maîtrise d’ouvrage

Des travaux spécifiques