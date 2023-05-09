const client = require('../config/database');

/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 */

/**
 * @typedef {object} InputUser
 * @property {string} email 
 * @property {string} password 
 * @property {string} firstname 
 * @property {string} lastname
 */
module.exports = {
    /**
     * Récupère par son id
     * @param {number} userId - L'id du user souhaité
     * @returns {User|null} Le User souhaité ou undefined si aucun User à cet id
     */
    async findByPk(userId) {
        const result = await client.query(
            'SELECT * FROM "user" WHERE "id" = $1',
            [userId]
        );

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    /**
     * Ajoute dans la base de données
     * @param {InputUser} user - Les données à insérer
     * @returns {User} Le User inséré
     */
    async insert(user) {
        const savedUser = await client.query(
            `INSERT INTO "user" ("email", "password", "firstname", "lastname") VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.email, user.password, user.firstname, user.lastname]
        );

        return savedUser.rows[0];
    },

    /**
     * Modifie dans la base de données
     * @param {number} userId - L'id à modifier
     * @param {InputUser} modifiedUserData - Les données à modifier
     * @returns {User} Le User modifié
     */
    async update(userId, modifiedUserData) {
        const savedUser = await client.query(
            `
            UPDATE "user" SET
            "email" = $1,
            "password" = $2,
            "firstname" = $3,
            "lastname" = $4
            WHERE id = $5
            RETURNING *
        `,
            [
                modifiedUserData.email,
                modifiedUserData.password,
                modifiedUserData.firstname,
                modifiedUserData.lastname,
                userId,
            ]
        );

        return savedUser.rows[0];
    },

    /**
     * Supprime de la base de données
     * @param {number} userId - L'id à supprimer
     * @returns {boolean} Le résultat de la suppression
     */
    async delete(userId) {
        const result = await client.query(
            'DELETE FROM "user" WHERE "id" = $1',
            [userId]
        );
        // Soit il a supprimer un enregistrement et
        // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    },

    //! Changer cette fonction en 2 fonctions qui font qu'une seule chose (une pour un modified user vs. une pour un new user)
    /**
     * Vérifie si un user existe déjà avec la meme addresse email
     * @param {object} inputData - Les données fourni par le client
     * @param {number} userId - L'identifiant du user (optionnel - dans le cas d'une modif)
     * @returns {boolean} soit le user existe soit il n'existe pas
     */
    async isEmailUnique(userEmail, userId) {
        const preparedQuery = {
            text: `SELECT * FROM "user" WHERE "email" = $1`,
            values: [userEmail],
        };

        // Si l'id est fourni on exclu l'enregistrement qui lui correspond
        if (userId) {
            preparedQuery.text += ' AND "id" <> $2';
            preparedQuery.values.push(userId);
        }
        const result = await client.query(preparedQuery);
        // Soit un user existe déja soit rien n'est renvoyé
        // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    },
};
