const autoCompleteDataMapper = require('../services/getAutoComplete');

module.exports = {
    async getPlacesByQuery(req, res) {
        try {
            const places = await autoCompleteDataMapper.findAll(req.params.place);
            if (!places) {
                return res.status(400).json('No place for your search');
            }
            let placeResults = [];
            places.forEach((place) => {
                placeResults.push({ 'id': `${place.id}`, 'name': `${place.name}` });
            });
            return res.status(200).json(placeResults);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    }
};
