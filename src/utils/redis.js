const redis = require('redis');
const { promisify } = require('util');

/**
 * A class to manage a Redis client connection and operations.
 */
class RedisClient {
  /**
   * Creates a new Redis client instance and connects to the Redis server.
   * Logs any connection errors to the console.
   */
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
      this.connected = false;
    });
    this.connected = true;
  }

  /**
   * Checks if the Redis client is currently connected.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.connected;
  }

}

/**
 * An instance of RedisClient.
 * @type {RedisClient}
 */
const redisClient = new RedisClient();
module.exports = redisClient;
