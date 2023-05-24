const { createClient } = require('redis');
const client = createClient(
    {url : process.env.REDIS_URL}
);
// mise en place d'une erreur interne redis
// client.on('error', (err) => {
//     console.log(err);
// });
client
    .connect()
    .then(() => console.log('Redis : client.isReady : ', client.isReady));

const timeout = process.env.REDIS_TIMEOUT;

module.exports = {
    isInCache: async (key) => {
        try {
            return await client.exists(key);
        } catch (error) {
            throw error
        }
    },

    getCache: async (key) => {
        try {
            const cachedString = await client.get(key);
            const cachedValue = JSON.parse(cachedString);
            console.log('Got key : ', key)
            return cachedValue;
        } catch (error) {
            throw error
        }
    },

    addToCache: async (key, data) => {
        try {
            const str = JSON.stringify(data);
            await client.set(key, str, { EX: timeout, NX: true });
            console.log('Cached key : ',key);
            return true
        } catch (error) {
            throw error
        }
    },

    flush: async () => {
        try {
            await client.del(key);
            console.log('Flushed key : ',key);
            return true
        } catch (error) {
            throw error
        }
    },
};
