const autoCompleteDataMapper = require('../services/getAutoComplete');
const isolateZipCode = require('../utils/isolateZipCode');

/* BEGINNING : JS DOCS SWAGGER OBJECT DEFINITION */
/**
 * @typedef {object} Place
 * @property {string} id
 * @property {string} name
 */
/* END : JS DOCS SWAGGER OBJECT DEFINITION */

module.exports = {
    async getPlacesByQuery(req, res) {
        try {
            // On récupère toutes les "places" en fonction de la demande utilisateur
            const places = await autoCompleteDataMapper.findAll(req.params.place);
            if (!places) {
                return res.status(400).json('No place for your search');
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            let placeResults = [];
            places.forEach((place) => {
                let zipCode = "";
                switch (place.embedded_type) {
                    case "stop_area":
                        // On ne tient pas compte des doublons d'id
                        if (!placeResults.find(({ id }) => id === place.stop_area.id)) {
                            if (place.stop_area.administrative_regions) {
                                // On récupère le "zip_code" s'il existe et est non null
                                zipCode = isolateZipCode(place.stop_area.administrative_regions);
                            }
                            // On remplit notre tableau avec des objets simplifiés pour le front
                            placeResults.push({ 'id': `${place.id}`, 'name': `${place.name} [${zipCode}]` });
                        }
                        break;
                    case "address":
                        // On ne tient pas compte des doublons d'id
                        if (!placeResults.find(({ id }) => id === place.address.id)) {
                            if (place.address.administrative_regions) {
                                // On récupère le "zip_code" s'il existe et est non null
                                zipCode = isolateZipCode(place.address.administrative_regions);
                            }
                            // On remplit notre tableau avec des objets simplifiés pour le front
                            placeResults.push({ 'id': `${place.id}`, 'name': `${place.name} [${zipCode}]` });
                        }
                        break;
                    default:
                        break;
                }
            });
            // On renvoie le tableau des objets "places" en version simplifié et lisible
            return res.status(200).json(placeResults);
        } catch (error) {
            error.status = 500
            error.type = 'autocompleting'
            next(error)
        }
    }
};
