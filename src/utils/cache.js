const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect().catch(console.error);

const DEFAULT_EXPIRATION = 60; 
exports.getOrSetCache = async (key, cb) => {
    const value = await client.get(key);
    if (value) {
        return JSON.parse(value);
    }

    const freshData = await cb();
    await client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
};

exports.clearCache = async (key) => {
    await client.del(key);
};

module.exports.client = client;
