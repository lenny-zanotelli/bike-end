const axios = require('axios');

module.exports = {
    async findAll(queryParam) {
        try {
            const URLtoFetch = process.env.SNCF_API_URL_NAVITIA +
                '/places?q=' +
                queryParam +
                '&type[]=address&type[]=stop_area&depth=1&count=100';
            const data = await axios.get(URLtoFetch,
                {
                    headers: {
                        'Authorization': process.env.SNCF_API_TOKEN_NAVITIA
                    }
                }
            );
            return data.data.places;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
