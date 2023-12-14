const fetchFromNavitia = require('./fetchFromNavitia');

module.exports = {
    async findAll(queryParam) {
        try {
            // On reconstruit l'url nécessaire à notre requête
            const endpointToFetch = `/places?q=${queryParam}&type[]=address&type[]=stop_area&depth=1&count=20`;
            // On lance la requête get via axios avec le token valide
            const data = await fetchFromNavitia(endpointToFetch)

            // On renvoie uniquement un tableau de "places"
            return data.data.places;
        } catch (error) {
            throw error;
        }
    },
};
