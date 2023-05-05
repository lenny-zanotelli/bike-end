// Importation des dépendances
const path = require('path');
const express = require('express');
const cors = require('cors');

// Appel de routeurs/index.js
const router = require('./routers');

const app = express();

// Middleware pour parser le payload JSON
app.use(express.json());

// Middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// Levée de la restriction CORS si non défini dans .env
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;