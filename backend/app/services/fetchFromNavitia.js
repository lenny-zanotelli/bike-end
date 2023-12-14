const axios = require('axios');

const token = process.env.SNCF_API_TOKEN_NAVITIA;
const url = process.env.SNCF_API_URL_NAVITIA

module.exports = async (endpoint) => {
    try {
        const urlToFetch = url + endpoint
        const data = await axios.get(urlToFetch, {
            headers: {
                Authorization: token,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
