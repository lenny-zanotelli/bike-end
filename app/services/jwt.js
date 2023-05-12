const jwt = require('jsonwebtoken');

module.exports = {
    createToken: async (user) => {
        try {
            // On récupère le secret s'il existe sinon 'testDev' par défaut
            const authApiSecret = process.env.AUTH_API_SECRET ?? 'testDev';
            // On renvoie un JWT avec le user id
            const token = await jwt.sign(
                { ...user },
                authApiSecret,
                { algorithm: 'HS256', expiresIn: '7d' }
            );
            return token
        } catch (error) {
            console.log(error)
            throw error
        }
    },
};
