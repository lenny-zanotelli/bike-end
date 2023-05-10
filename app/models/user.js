const client = require('../config/database');

/**
 * @typedef {object} User le user issus de la bdd
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {boolean} accepted_conditions
 */

/**
 * @typedef {object} InputUser
 * @property {string} email
 * @property {string} password
 * @property {string} firstname
 * @property {string} lastname
 * @property {boolean} acceptedConditions
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
     * @param {InputUser} userData - Les données à insérer
     * @returns {User} Le User inséré
     */
    async insert(userData) {
        const savedUser = await client.query(
            `INSERT INTO "user" ("email", "password", "firstname", "lastname", "accepted_conditions") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [
                userData.email,
                userData.password,
                userData.firstname,
                userData.lastname,
                userData.acceptedConditions,
            ]
        );
        
        return savedUser.rows[0];
    },

    /**
     * Modifie dans la base de données
     * @param {number} userId - L'id à modifier
     * @param {InputUser} modifiedUserData - Les données à modifier
     * @returns {User} Le User modifié
     */
    async update(modifiedUserData) {
        const savedUser = await client.query(
            `
            UPDATE "user" SET
            "email" = $1,
            "password" = $2,
            "firstname" = $3,
            "lastname" = $4,
            "accepted_conditions" = $5,
            "updated_at" = now()
            WHERE id = $6
            RETURNING *
        `,
            [
                modifiedUserData.email,
                modifiedUserData.password,
                modifiedUserData.firstname,
                modifiedUserData.lastname,
                modifiedUserData.accepted_conditions,
                modifiedUserData.id,
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
    /**
     * Vérifie si
     * @param {number} userId - L'id à supprimer
     * @returns {boolean} Le résultat de la suppression
     */
    async isEmailUsedByOthers(userId, userNewEmail) {
        // Cherche les occurences de cet email hormi celui du user en cours
        const preparedQuery = {
            text: `SELECT * FROM "user" WHERE "email" = $1 AND "id" <> $2`,
            values: [userNewEmail, userId],
        };
        const result = await client.query(preparedQuery);

        // Soit un user existe déja soit rien n'est renvoyé
        // le rowcount est égal à 1 (truthy) soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    },

    async findByEmail(newUserEmail) {
        const preparedQuery = {
            text: `SELECT * FROM "user" WHERE "email" = $1`,
            values: [newUserEmail],
        };
        const result = await client.query(preparedQuery);
        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
