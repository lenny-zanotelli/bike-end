const getFromAPI = require("../services/getFromAPI");

const sncfAPI = {
    baseURL : process.env.SNCF_API_URL,
    token : process.env.SNCF_API_TOKEN

}

module.exports =  sncfAPI