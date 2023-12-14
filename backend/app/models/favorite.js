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
        const result = await client.query(
            `SELECT * FROM "favorite"
            WHERE "user_id" = $1;`,
            [userId]
        );

        return result.rows;
    },

    /**
     * Récupère un favori par son queryUrl
     * @param {string} favoriteQueryUrl Le queryUrl du favori souhaité
     * @returns {Favorite|null} Le favori souhaité ou null si aucun favori ne correspond à ce queryUrl
     */
    async findByQueryUrl(userId, favoriteQueryUrl) {
        const result = await client.query(
            `SELECT * FROM "favorite"
            WHERE "queryUrl" = $2 AND "user_id" = $1;`,
            [userId, favoriteQueryUrl]
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
        const result = await client.query(
            `INSERT INTO "favorite"
            (
                "departure_date_time",
                "duration",
                "from_name",
                "from_id",
                "to_name",
                "to_id",
                "nb_transfers",
                "queryUrl",
                "user_id"
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;`,
            [
                newFavorite.departure_date_time,
                newFavorite.duration,
                newFavorite.from.name,
                newFavorite.from.id,
                newFavorite.to.name,
                newFavorite.to.id,
                newFavorite.nb_transfers,
                newFavorite.queryUrl,
                userId,
            ]
        );

        return result.rows[0];
    },

    /**
     * Modifie dans la base de données
     * @param {json} comment - Les données à modifier
     * @returns {Favorite} Le Favori modifié
     */
    async update(userId, favoriteQueryUrl, comment) {
        const result = await client.query(
            `UPDATE "favorite"
            SET "comment" = $3, "updated_at" = now()
            WHERE "queryUrl" = $2 AND "user_id" = $1
            RETURNING *;`,
            [userId, favoriteQueryUrl, comment]
        );

        return result.rows[0];
    },

    /**
     * Supprime de la base de données
     * @param {number} id - L'id du user qui supprime
     * @param {number} queryUrl - Le queryUrl du favorite à supprimer
     * @returns {boolean} Le résultat de la suppression
     */
    async delete(userId, favoriteQueryUrl) {
        // Ici on utilise la valeur to_id pour pointer le favori à supprimer
        const result = await client.query(
            `DELETE FROM "favorite"
            WHERE "queryUrl" = $2 AND "user_id" = $1
            RETURNING *;`,
            [userId, favoriteQueryUrl]
        );

        // Soit il a supprimé un enregistrement et le rowcount est égal à 1 (truthy),
        // soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    },
};
