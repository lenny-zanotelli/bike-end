// Importation des dépendances
const path = require('path');
const express = require('express');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');

// Appel de routeurs/index.js
const router = require('./routers');

const app = express();

// Middleware pour parser le payload JSON
app.use(express.json());

// Middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// Levée de la restriction CORS si non défini dans .env
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

// API documentation : Swagger options
const options = {
    info: {
        version: '1.0.0',
        title: 'Bike-end',
        description: 'Bike-end app to travel by train and bike',
    },
    // security: {
    //     BasicAuth: {
    //         type: 'http',
    //         scheme: 'basic',
    //     },
    // },
    // Base directory which we use to locate your JSDOC files
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: true,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/api/docs',
};

// API documentation : Swagger options
expressJSDocSwagger(app)(options);

app.use(router);

module.exports = app;
