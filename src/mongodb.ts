import { MongoClient, Db } from 'mongodb';

let cachedDb: Db = null;

const connectToDatabase = async (uri: string) => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const dbName = new URL(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
};

export default connectToDatabase;
