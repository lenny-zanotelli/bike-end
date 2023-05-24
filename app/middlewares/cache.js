const { getJourneysByFilters } = require('../controllers/journey');
const { favoriteDataMapper } = require('../models');
const cache = require('../services/cache');

const paginateAndCacheJourneys = async (req, res, next) => {
    try {
        // on recupere de l'url les searchParams de pagination (per_page et current_page)
    
        // afin de pouvoir conserver la structure des searchparmas et de l'url, je genere une instance URL temporaire
        // à partir de req.url et un string qui est interpreté par le constructeur URL
        const myUrl = new URL(req.url, 'https://example.url');
    
        // je récupere mes queries de pagination
        const perPage = req.query['per_page'];
        const currentPage = req.query['current_page'];
        // puis je les supprime car je ne veux pas les envoyer en requete ni garder en cache
        myUrl.searchParams.delete('per_page');
        myUrl.searchParams.delete('current_page');
    
        req.search = myUrl.search;
    
        // on crée un key correspondant à notre requete
        const key = `bikeend:${req.userId}:${req.search}`;
    
        // on constitue allJourneys a à partir du cache ou de l'API
        let allJourneys = [];
        // si dans le cache on prend dans le cache,
        if (await cache.isInCache(key)) {
            allJourneys = await cache.getCache(key);
            // sinon on fetch à l'API ext et on sauve dans le cache
        } else {
            const results = await getJourneysByFilters(req, res, next);
            // on s'assure qu'il n'y a qu'une seule version de to.id par requete afin qu'il soit utilisé en front comme key
            allJourneys = results.filter((result) =>
                results.findIndex((each) => each.to.id === result.to.id)
            );
            cache.addToCache(key, allJourneys);
        }
    
        const startElm = (currentPage - 1) * perPage;
        // last element is not included in slice
        const endElm = currentPage * perPage;
        // on pagine les resultats
        const paginatedJourneys = allJourneys.slice(startElm, endElm);
    
        const favorites = await favoriteDataMapper.findAllByUser(req.userId);
    
        await paginatedJourneys.map((journey) => {
            // par defaut on met isFavorite a false
            journey.isFavorite = false;
    
            // si journey existe en BDD des favoris via le queryUrl
            if (
                favorites.find((favorite) => favorite.queryUrl === journey.queryUrl)
            ) {
                journey.isFavorite = true;
            }
        });
    
        return res.status(200).json(paginatedJourneys);
    } catch (error) {
        error.status=500
        error.type = 'caching journeys'
        next(error)
    }
};

module.exports = { paginateAndCacheJourneys };
