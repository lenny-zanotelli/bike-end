module.exports = {
    async getTrips(req, res) {
        const searchURL = req.url
        const filters = {};
        for (const [key, value] of searchURL.searchParams) {
            filters[key] = value;
        }

    },
};
