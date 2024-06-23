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
        console.log('MongoDB connected successfully');
        this.db = client.db('journalhub');
        this.emit('connected');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        this.emit('error', err);
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
dbClient.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

export default dbClient;
