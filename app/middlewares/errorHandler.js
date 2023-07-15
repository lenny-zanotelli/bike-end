const errorHandler = (error, req, res, next) => {
    const errorMessage = `-------- An error occured while ${error.type} : ------- \n${error.message}\n${error.stack}`
    console.error(errorMessage)
    res.status(error.status).json({ error: `An error occurred while ${error.type}` })
}

module.exports = {
    errorHandler
}
