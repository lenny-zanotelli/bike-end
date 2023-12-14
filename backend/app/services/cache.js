const flatted = require('flatted');
const { createClient } = require('redis');

const client = createClient({
    socket: {
        host: process.env.REDISHOST,
        port: process.env.REDISPORT
    },
    username: process.env.REDISUSER,
    password: process.env.REDISPASSWORD
});

(async () => {
    await client.connect();
})();

client.on('ready', () => {
    console.log('Redis : client.isReady');
})

// mise en place d'une erreur interne redis
client.on('error', (err) => {
    console.log('--- Redis error ---\n', err);
});

const timeout = process.env.REDIS_TIMEOUT;

module.exports = {
    isInCache: async (key) => {
        try {
            const exists = await client.exists(key);
            return exists === 1;
        } catch (error) {
            console.error('Error checking cache existence:', error);
            throw error
        }
    },

    getCache: async (key) => {
        try {
            const cachedString = await client.get(key);
            if(cachedString) {
                const cachedValue = flatted.parse(cachedString);
                console.log('Got key : ', key)
                return cachedValue;
            }
            return null;
        } catch (error) {
            throw error
        }
    },

    addToCache: async (key, data) => {
        try {
            console.log('Data to be cached:', data);
            const str = flatted.stringify(data);
            await client.set(key, str, { EX: timeout, NX: true });
            console.log('Cached key : ', key);
            return true
        } catch (error) {
            console.error('Error while caching data:', error);
            throw error
        }
    },

    flush: async () => {
        try {
            await client.del(key);
            console.log('Flushed key : ', key);
            return true
        } catch (error) {
            throw error
        }
    },
};
