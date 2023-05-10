module.exports = {
    createToken: async (user) => {
        try {
            // On renvoie un JWT avec le user id
            const token = await jwt.sign(
                { ...user },
                process.env.AUTH_API_SECRET,
                { algorithm: 'HS256', expiresIn: 7 }
            );
            return token
        } catch (error) {
            console.log(error)
            throw error
        }
    },
};
