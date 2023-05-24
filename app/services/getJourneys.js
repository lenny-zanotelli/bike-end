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
    // async findAll({ from, datetime = "20230531T180000", maxduration = 1200 }) {
    //     try {
    //         // On reconstruit l'url nécessaire à notre requête
    //         const URLtoFetch = process.env.SNCF_API_URL_NAVITIA +
    //             '/journeys?from=' +
    //             from +
    //             '&datetime=' +
    //             datetime +
    //             '&max_duration=' +
    //             maxduration;
    //         // On lance la requête get via axios avec le token valide
    //         const data = await axios.get(URLtoFetch,
    //             {
    //                 headers: {
    //                     'Authorization': process.env.SNCF_API_TOKEN_NAVITIA
    //                 }
    //             }
    //         );
    //         // On renvoie uniquement un tableau de "journeys"
    //         return data.data.journeys;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // async findByLink(link) {
    //     try {
    //         // On reconstruit l'url nécessaire à notre requête
    //         const URLtoFetch = process.env.SNCF_API_URL_NAVITIA +link;
    //         // On lance la requête get via axios avec le token valide
    //         const data = await axios.get(URLtoFetch,
    //             {
    //                 headers: {
    //                     'Authorization': process.env.SNCF_API_TOKEN_NAVITIA
    //                 }
    //             }
    //         );
    //         // On renvoie uniquement un tableau de "journeys"
    //         return data.data.journeys;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};
