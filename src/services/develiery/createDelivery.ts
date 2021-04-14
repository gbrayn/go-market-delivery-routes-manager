import connectToDatabase from '../../mongodb';
import { Delivery } from '../../interfaces';

const createDelivery = async (deliveryPayload: Delivery) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('deliveries');

  const delivery = await collection.insertOne(deliveryPayload);

  if (delivery) {
    return delivery;
  }

  return null;
};

export default createDelivery;
