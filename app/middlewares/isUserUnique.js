const { isEmailAlreadyUsed, isEmailExistsInDB } = require("../models/user");

const isUserUnique = async (req, res, next) => {
    let error;
    switch (req.method) {
        // en methode PATCH (mise à jour user) on veut voir si un autre user utilise cet email
        case 'PATCH':
            error = await isEmailAlreadyUsed(req.userId, req.body.email);
            break;
        // en méthode POST (signup) on veut voir si il existe un user avec cet email
        case 'POST':
            error = await isEmailExistsInDB(req.body.email);
            break;
    }
    if (error) {
        res.status(400).json('User already exists with this email');
    } else {
        next();
    }
};

module.exports = {isUserUnique}
