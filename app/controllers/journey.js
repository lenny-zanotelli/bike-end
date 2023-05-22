const journeyDataMapper = require('../services/getJourneys');

module.exports = {
    async getJourneysByFilters(req, res) {
        try {
            // On récupère tous les "journeys" en fonction du choix de l'utilisateur
            const journeys = await journeyDataMapper.findByQueryUrl(
                `/journeys${req._parsedUrl.search}`
            );
            if (!journeys) {
                return res.status(400).json('No journey for your search');
            }
            // On reconstruit la réponse JSON avec les données nécessaires
            let journeyResults = [];

            journeys.forEach((journey) => {
                // On remplit notre tableau avec des objets simplifiés pour le front
                journeyResults.push({
                    departure_date_time: journey.departure_date_time,
                    duration: journey.duration,
                    from: {
                        id: journey.from.id,
                        name: journey.from.name,
                    },
                    to: {
                        id: journey.to.id,
                        name: journey.to.name,
                    },
                    nb_transfers: journey.nb_transfers,
                    queryUrl: journey.links[0].href.replace(
                        'https://api.navitia.io/v1/journeys',
                        ''
                    ),
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
            // On spécifie que l'on veut le début du trajet en vélo
            const journey = await journeyDataMapper.findByQueryUrl(
                `/journeys${req._parsedUrl.search}&first_section_mode[]=bike`
            );
            // const journey = await journeyDataMapper.findByLink(req.body.link);
            if (!journey) {
                return res
                    .status(400)
                    .json('No details availables for your journey');
            }
        
            // on récupert uniquement le premier trajet proposé (celui classé "best" par Navitia)
            const bestJourney = journey[0];

            // On reconstruit la réponse JSON avec les données nécessaires
            // tout d'abord on recupere les portions du trajet
            const sections = bestJourney.sections.map((section) => {
                let transportMode = '';
                // si envie d'envoyer des informations sur les lignes de transport utilisées
                // let transportDetails = {}
                switch (section.type) {
                    case 'transfer':
                        transportMode = `transfer_${section.transfer_type}`;
                        break;
                    case 'street_network':
                        transportMode = section.mode;
                        break;
                    case 'public_transport':
                        transportMode =
                            section.display_informations.commercial_mode;
                        // transportDetails = {network : section.display_informations.network, line ....;
                        break;
                    default:
                        transportMode = section.type;
                        break;
                }
                return {
                    departure_date_time: section.departure_date_time,
                    arrival_date_time: section.arrival_date_time,
                    duration: section.duration,
                    from: {
                        id: section.from.id,
                        name: section.from.name,
                    },
                    to: {
                        id: section.to.id,
                        name: section.to.name,
                    },
                    transportMode
                };
            });

            // ensuite on construit l'objet de réponse
            const journeyResult = {
                departure_date_time: bestJourney.departure_date_time,
                arrival_date_time: bestJourney.arrival_date_time,
                duration: bestJourney.duration,
                nb_transfers: bestJourney.nb_transfers,
                // la première section commence au départ (départ souhaitée)
                from: {
                    id: sections[0].from.id,
                    name: sections[0].from.name,
                },
                // la derniere section fini au terminus (arrivée souhaitée)
                to: {
                    id: sections.at(-1).to.id,
                    name: sections.at(-1).to.name,
                },
                // les sections du trajet
                sections: sections,
            };
            // On renvoie l'objets journey en version simplifié et lisible
            return res.status(200).json(journeyResult);
            // return res.status(200).json(journey);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
};
