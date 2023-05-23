const errorHandler = (error, req, res, next)=> {
    console.error(`Error while ${error.type} :`, error)
    res.status(error.status).json(error)
}

module.exports = {
    errorHandler
}