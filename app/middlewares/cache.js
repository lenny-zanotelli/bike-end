const { getAllFavorites } = require('../controllers/favorite');
const { getJourneysByFilters } = require('../controllers/journey');
const { favoriteDataMapper } = require('../models');
const { isInCache, getCache, addToCache } = require('../services/cache');

const paginateAndCacheJourneys = async (req, res, next) => {
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
    if (await isInCache(key)) {
        allJourneys = await getCache(key);
    } else {
        const results = await getJourneysByFilters(req, res, next);
        allJourneys = results.filter((journey, index) =>
            results.findIndex((journey) => journey.to.id === index)
        );
        addToCache(key, allJourneys);
    }

    const startElm = (currentPage - 1) * perPage;
    // last element is not included in slice
    const endElm = currentPage * perPage;
// on pagine les resultats
    const paginatedJourneys = allJourneys.slice(startElm, endElm);

const favorites = await favoriteDataMapper.findAllByUser(req.userId)

await paginatedJourneys.map(journey => {
    // par defaut on met isFavorite a false
    journey.isFavorite =false

    // si journey existe en BDD des favoris via le queryUrl
    if(favorites.find(favorite => favorite.queryUrl === journey.queryUrl)){
        journey.isFavorite = true
    }
})

    return res.status(200).json(paginatedJourneys);
};

module.exports = { paginateAndCacheJourneys };
