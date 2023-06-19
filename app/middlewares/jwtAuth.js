const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json('Invalid token');
        }
        const userData = jwt.verify(token, process.env.AUTH_API_SECRET);
        if (!userData) {
            return res.status(401).json('Invalid token');
        }
        console.log('Verified user : ', userData)
        // on renseigne dans notre requete l'id du user afin de parametrer les requetes
        req.userId = userData.userId;
        next();
    } catch (error) {
        error.status = 500
        error.type = 'validating token'
        next(error)
    }
};

module.exports = { jwtAuth };