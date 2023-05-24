const journeyDataMapper = require('../services/getJourneys');

/**
 * @typedef {object} Place
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {object} Journey
 * @property {string} departure_date_time
 * @property {integer} duration
 * @property {Place} from
 * @property {Place} to
 * @property {integer} nb_transfers
 * @property {string} queryUrl
 */

/**
 * @typedef {object} SectionItem
 * @property {string} departure_date_time
 * @property {string} arrival_date_time
 * @property {integer} duration
 * @property {Place} from
 * @property {Place} to
 * @property {string} transportMode
 */

/**
 * @typedef {object} JourneyDetail
 * @property {string} departure_date_time
 * @property {string} arrival_date_time
 * @property {integer} duration
 * @property {integer} nb_transfers
 * @property {Place} from
 * @property {Place} to
 * @property {array<SectionItem>} sections
 */

module.exports = {
    async getJourneysByFilters(req, res, next) {
        try {
            // On récupère tous les "journeys" en fonction du choix de l'utilisateur
            const journeys = await journeyDataMapper.findByQueryUrl(
                // `/journeys${req._parsedUrl.search}`
                `/journeys${req.search}`
            );
            if (!journeys) {
                return res.status(400).json('No journey for your search');
            }
            const minJourneyDuration = process.env.MIN_DURATION;
            // On reconstruit la réponse JSON avec les données nécessaires
            const journeyResults = [];

            journeys.forEach((journey) => {
                // on limite les resultats aux trajets qui ont une durée minimum 
                if (journey.duration > minJourneyDuration) {
                    // On remplit notre tableau avec des objets simplifiés pour le front,
                    // par ailleurs on enleve le searchParams max_duration
                    simplifiedUrl = new URL(journey.links[0].href);
                    simplifiedUrl.searchParams.delete('max_duration');

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
                        queryUrl: simplifiedUrl.search,
                    });
                }
            });
            // On renvoie le tableau des objets "journeys" en version simplifié et lisible
            return journeyResults;
        } catch (error) {
            error.status = 500;
            error.type = 'fetching journeys';
            next(error);
        }
    },
    async getJourneyDetails(req, res, next) {
        try {
            // On récupère tous les détails du journey choisi par l'utilisateur
            // On spécifie que l'on veut le début du trajet en vélo
            const journey = await journeyDataMapper.findByQueryUrl(
                `/journeys${req._parsedUrl.search}&first_section_mode[]=bike`
            );
            // const journey = await journeyDataMapper.findByLink(req.body.link);
            if (!journey[0]) {
                return res
                    .status(400)
                    .json('No details availables for your journey');
            }

            // on récupère uniquement le premier trajet proposé (celui classé "best" par Navitia)
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
                    transportMode,
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
            error.status = 500;
            error.type = 'fetching journey details';
            next(error);
        }
    },
};
