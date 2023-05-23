const { getJourneysByFilters } = require('../controllers/journey');

const paginate = async (req, res, next) => {
    // on nettoie le url des searchParams non désirés
    const myUrl = new URL(req.url, 'https://example.url');
    const perPage = req.query['per_page'];
    myUrl.searchParams.delete('per_page');
    const currentPage = req.query['current_page'];
    myUrl.searchParams.delete('current_page');

    req.search = myUrl.search;
    const allJourneys = await getJourneysByFilters(req, res);
    const filteredJourneys = allJourneys.filter(
        (journey, index) => allJourneys.findIndex(journey => journey.to.id === index
    ));
    // console.log('allJourneys : ',allJourneys)
    const startElm = (currentPage - 1) * perPage;
    // console.log('startElm : ', startElm);
    const endElm = currentPage * perPage - 1;
    // console.log('endElm : ', endElm);
    const paginatedJourneys = filteredJourneys.slice(startElm, endElm);
    // console.log('paginatedJourneys : ', paginatedJourneys);
    return res.status(200).json(paginatedJourneys);
};

module.exports = { paginate };
