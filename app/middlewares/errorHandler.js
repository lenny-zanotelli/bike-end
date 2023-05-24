const errorHandler = (error, req, res, next)=> {
    const errorMessage = `-------- An error occured while ${error.type} : ------- \n${error.message}\n${error.stack}`
    console.error(errorMessage)
    res.status(error.status).json(`-------- An error occured while ${error.type} : ------- `)
}


module.exports = {
    errorHandler
}