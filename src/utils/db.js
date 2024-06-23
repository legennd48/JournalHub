/* eslint-disable class-methods-use-this */
import { MongoClient, ObjectID } from 'mongodb';
import EventEmitter from 'events';

const MONGO_URI = process.env.MONGO_URI; // Url to be set as env variable

class DBClient extends EventEmitter {
  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.client.connect()
      .then((client) => {
        this.db = client.db('journalhub');
        this.emit('connected');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  isAlive() {
    return !!this.db;
  }

  ObjectID(id) {
    return new ObjectID(id);
  }
}

const dbClient = new DBClient();
export default dbClient;
