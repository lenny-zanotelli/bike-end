const axios = require('axios')

module.exports = async(fetchData) => {
    try {
        const data = await axios.get(fetchData)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}