const journeyDataMapper = require('../services/getJourneys');

module.exports = {
    async getJourneysByFilters(req, res) {
        try {
            console.log('*******************************req.url.search : ',req.url.search)
            // On récupère tous les "journeys" en fonction du choix de l'utilisateur
            const journeys = await journeyDataMapper.findByParams(req.url.search);
            if (!journeys) {
                return res.status(400).json('No journey for your search');
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            let journeyResults = [];
            
            journeys.forEach((journey) => {
                const detailsParams = journey.links[0].href.replace('https:\/\/api.navitia.io\/v1\/journeys', '')
                // On remplit notre tableau avec des objets simplifiés pour le front
                journeyResults.push({
                    departure_date_time: journey.departure_date_time,
                    duration: journey.duration,
                    from_name: journey.from.name,
                    from_id: journey.from.id,
                    to_name: journey.to.name,
                    to_id: journey.to.id,
                    params: detailsParams
                });
            });
            // On renvoie le tableau des objets "journeys" en version simplifié et lisible
            return res.status(200).json(journeyResults);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },
    
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
                const detailsParams = journey.links[0].href.replace('https:\/\/api.navitia.io\/v1\/', '')
                // On remplit notre tableau avec des objets simplifiés pour le front
                journeyResults.push({
                    departure_date_time: journey.departure_date_time,
                    duration: journey.duration,
                    from_name: journey.from.name,
                    from_id: journey.from.id,
                    to_name: journey.to.name,
                    to_id: journey.to.id,
                    link: detailsParams
                });
            });
            // On renvoie le tableau des objets "journeys" en version simplifié et lisible
            return res.status(200).json(journeyResults);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    },

    async getJourneyDetails(req, res) {
        try {
            // On récupère tous les détails du journey choisi par l'utilisateur
            const journey = await journeyDataMapper.findByLink(req.details);
            // const journey = await journeyDataMapper.findByLink(req.body.link);
            if (!journey) {
                return res.status(400).json('No details availables for your journey');
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            let journeyResults = [];
            journey.forEach((journey) => {
                const correctedDatetime = dayjs(journey.departure_date_time)
                // On remplit notre tableau avec des objets simplifiés pour le front
                journeyResults.push({
                    'departure_date_time': `${journey.departure_date_time}`,
                    'duration': `${journey.duration}`,
                    'from_name': `${journey.from.name}`,
                    'from_id': `${journey.from.id}`,
                    'to_name': `${journey.to.name}`,
                    'to_id': `${journey.to.id}`,
                    'link': `${journey.links[0].href}`
                });
            });
            // On renvoie le tableau des objets "journeys" en version simplifié et lisible
            return res.status(200).json(journeyResults);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occured');
        }
    }
};
