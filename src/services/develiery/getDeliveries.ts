import connectToDatabase from '../../mongodb';

const getDeliveries = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('deliveries');

  const deliveries = await collection.find({}).toArray();

  return deliveries;
};

export default getDeliveries;
