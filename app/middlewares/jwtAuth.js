const jwt = require('jsonwebtoken');
const { jwtAuth } = require('.');

const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json('Invalid token');
    }
    try {
        const user = jwt.verify(token, process.env.AUTH_API_SECRET);
        if (!user) {
            return res.status(401).json('Invalid token');
        }
        // on renseigne dans notre requete l'id du user afin de parametrer les requetes
        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal error');
    }
};

module.exports = { jwtAuth };
