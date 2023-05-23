/**
 * @typedef {object} ValidationError
 * @property {string} error Error message
 */

/**
 * Générateur de middleware pour la validation
 * d'un objet d'une des propriété de la requête
 * @param {string} prop - Nom de la propriété de l'objet request à valider
 * @param {Joi.object} schema - Le schéma de validation du module Joi
 * @returns
 * Renvoie un middleware pour express qui valide le corps de la requête
 * en utilisant le schéma passé en paramètre.
 * Renvoie une erreur 400 si la validation échoue.
 */
module.exports = (prop, schema) => async (request, res, next) => {
    try {
        // On ignore la "value" car on ne la récupère pas
        // request['body'] == request.body
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        // On doit afficher l'erreur à l'utilisateur
        // STATUS HTTP pour une erreur de saisie : 400
        console.error(error);
        res.status(400).send('Bad request : ' + error.message);
    }
};
