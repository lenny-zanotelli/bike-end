const { isEmailAlreadyUsed, findByEmail } = require('../models/user');

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
            error = await isEmailAlreadyUsed(req.userId, req.body.email);
            break;
        // en méthode POST (signup) on veut voir si il existe un user avec cet email
        case 'POST':
            const existingUser = await findByEmail(req.body.email);
            // Soit un user existe déja soit rien n'est renvoyé
            // le rowcount est égal à 1 (truthy) soit non et il est égal a 0 (falsy)
            // On cast le truthy/falsy en vrai booléen
            error = !!existingUser.rowCount;
            break;
    }
    if (error) {
        res.status(400).json('User already exists with this email');
    } else {
        next();
    }
};

const userOneIsLoggedIn = (req, res, next) => {
    req.userId = 1;
    next();
};

const passwordCheck = (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) {
        res.status(400).json(
            'Password and verification password are different'
        );
    } else {
        next();
    }
};

module.exports = { isUserUnique, userOneIsLoggedIn, encryptPwd, passwordCheck };
