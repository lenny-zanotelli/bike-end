const client = require('../config/database');

module.exports = {
    /**
     * Récupère tous les favoris sans filtre ni ordre
     * @returns {Favorite[]} Tous les favoris dans la base de données
     */
    async findAll() {
        const result = await client.query(`SELECT * FROM "favorite";`);

        return result.rows;
    },

    /**
     * Récupère tous les favoris sans filtre ni ordre d'un seul USER
     * @returns {Favorite[]} Tous les favoris d'un seul USER dans la base de données
     */
    async findAllByUser(userId) {
        const result = await client.query(`SELECT * FROM "favorite" WHERE "user_id" = $1;`,
            [
                userId
            ]
        );

        return result.rows;
    },

    /**
     * Récupère un favori par son id
     * @param {number} favoriteId L'id du favori souhaité
     * @returns {Favorite|null} Le favori souhaité ou null si aucun favori ne correspond à cet id
     */
    async findByPk(userId, favoriteId) {
        const result = await client.query(`SELECT * FROM "favorite" WHERE "id" = $2 AND "user_id" = $1;`,
            [
                userId,
                favoriteId
            ]
        );

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    /**
     * Ajoute dans la base de données
     * @param {json} newFavorite - Les données à insérer
     * @returns {Favorite} Le Favori inséré
     */
    async insert(userId, newFavorite) {
        const result = await client.query(`INSERT INTO "favorite"
            (
                "origin",
                "destination",
                "comment",
                "journey_time",
                "user_id"
            ) 
            VALUES ($1, $2, $3, $4, $5);`,
            [
                newFavorite.origin,
                newFavorite.destination,
                newFavorite.comment,
                newFavorite.journey_time,
                userId
            ]
        );

        return result.rows[0];
    },

    /**
     * Modifie dans la base de données
     * @param {json} comment - Les données à modifier
     * @returns {Favorite} Le Favori modifié
     */
    async update(userId, favoriteId, comment) {

        const result = await client.query(`UPDATE "favorite" SET "comment" = $2 WHERE "id" = $1;`,
            [
                favoriteId,
                comment
            ]
        );

        return result.rows[0];
    },

    /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns {boolean} Le résultat de la suppression
     */
    async delete(favoriteId) {
        const result = await client.query(`DELETE FROM "favorite" WHERE "id" = $1`,
            [
                favoriteId
            ]
        );

        // Soit il a supprimé un enregistrement et le rowcount est égal à 1 (truthy),
        // soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    }
};
