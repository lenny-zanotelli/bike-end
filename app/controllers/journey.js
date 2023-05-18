const journeyDataMapper = require('../services/getJourneys');

module.exports = {
    async getJourneysByPlace(req, res) {
        try {
            // On récupère tous les "journeys" en fonction du choix de l'utilisateur
            const journeys = await journeyDataMapper.findAll(req.params);
            if (!journeys) {
                return res.status(400).json('No journey for your search');
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            let journeyResults = [];
            journeys.forEach((journey) => {
                // On remplit notre tableau avec des objets simplifiés pour le front
                journeyResults.push({
                    'duration': `${journey.duration}`,
                    'from_name': `${journey.from.name}`,
                    'from_id': `${journey.from.id}`,
                    'to_name': `${journey.to.name}`,
                    'to_id': `${journey.to.id}`,
                    'link': `${journey.links[0].href}`
                });
            });
            // On renvoie le tableau des objets "places" en version simplifié et lisible
            return res.status(200).json(journeyResults);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    }
};
