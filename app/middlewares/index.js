// import dependencies
const bcrypt = require('bcrypt');

// import datamapper
const { isEmailUsedByOthers, findByEmail } = require('../models/user');

// import modules
const { jwtAuth } = require('./jwtAuth');
const { maxDuration } = require('./maxDuration');
const { paginateAndCacheJourneys } = require('./cache');
const { errorHandler } = require('./errorHandler');

const encryptPwd = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    next();
};

const isUserUnique = async (req, res, next) => {
    let error = false;
    switch (req.method) {
        // en methode PATCH (mise à jour user) on veut voir si un autre user utilise cet email
        case 'PATCH':
            error = await isEmailUsedByOthers(req.userId, req.body.email);
            break;
        // en méthode POST (signup) on veut voir si il existe un user avec cet email
        case 'POST':
            const existingUser = await findByEmail(req.body.email);
            // Soit un user existe déja (objet user) soit rien n'est renvoyé (null)
            // C'est donc soit user (truthy) soit null (falsy)
            // On cast le truthy/falsy en vrai booléen
            error = !!existingUser;
            break;
    }
    if (error) {
        res.status(400).json('User already exists with this email');
    } else {
        next();
    }
};

module.exports = { jwtAuth, isUserUnique, encryptPwd, maxDuration, paginateAndCacheJourneys, errorHandler };
