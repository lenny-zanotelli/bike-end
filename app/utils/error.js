const logAndResponseError = (errorCode, ongoingAction, res, error) => {
    const errorMessage = `-------- An error occured when ${ongoingAction} : ------- \n${error.message}`
    console.error(errorMessage);
    res.status(errorCode).send(errorMessage);
}

module.exports = {logAndResponseError}