const { getJourneysByFilters } = require('../controllers/journey');
const { favoriteDataMapper } = require('../models');
const cache = require('../services/cache');

const fetchAndCacheJourneys = async (req, res, next) => {
    try {
        // Suppression des paramètres de pagination de l'URL pour conserver la structure de l'URL
        const myUrl = new URL(req.url, 'https://example.url');
        myUrl.searchParams.delete('per_page');
        myUrl.searchParams.delete('current_page');
        req.search = myUrl.search;

        // Création d'une clé correspondant à la requête pour le cache
        const key = `bikeend:${req.userId}:${req.search}`;

        let journeys = [];

        // Vérification si les données sont dans le cache
        if (await cache.isInCache(key)) {
            journeys = await cache.getCache(key);
        } else {
            // Si les données ne sont pas dans le cache, on récupère les données depuis l'API
            journeys = await getJourneysByFilters(req, res, next);

            // Sauvegarde des données dans le cache
            await cache.addToCache(key, journeys);
        }

        // Récupération des favoris de l'utilisateur
        const favorites = await favoriteDataMapper.findAllByUser(req.userId);

        // Mise à jour de chaque trajet avec la propriété "isFavorite" si c'est un favori
        journeys.forEach((journey) => {
            journey.isFavorite = favorites.some(
                (favorite) => favorite.queryUrl === journey.queryUrl
            );
        });

        return res.status(200).json(journeys);
    } catch (error) {
        error.status = 500;
        error.type = 'fetching and caching journeys';
        next(error);
    }
};

module.exports = { fetchAndCacheJourneys };
