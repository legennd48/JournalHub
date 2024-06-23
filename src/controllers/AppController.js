/* eslint-disable class-methods-use-this */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  async getStatus(req, res) {
    const data = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).json(data);
  }
}

module.exports = new AppController();