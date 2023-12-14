const fetchFromNavitia = require('./fetchFromNavitia');

module.exports = {
    async findByQueryUrl(queryUrl) {
        try {
            // On reconstruit l'url nécessaire à notre requête
            const endpointToFetch = queryUrl;
            // On lance la requête get via axios avec le token valide
            const data = await fetchFromNavitia(endpointToFetch);
            // On renvoie uniquement un tableau de "journeys"
            return data.data.journeys;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
