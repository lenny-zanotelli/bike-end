const axios = require('axios');

module.exports = {
    async findAll(queryParam) {
        try {
            // On reconstruit l'url nécessaire à notre requête
            const URLtoFetch = process.env.SNCF_API_URL_NAVITIA +
                '/places?q=' +
                queryParam +
                '&type[]=address&type[]=stop_area&depth=1&count=100';
            // On lance la requête get via axios avec le token valide
            const data = await axios.get(URLtoFetch,
                {
                    headers: {
                        'Authorization': process.env.SNCF_API_TOKEN_NAVITIA
                    }
                }
            );
            // On renvoie uniquement un tableau de "places"
            return data.data.places;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
