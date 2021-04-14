import { NextApiRequest, NextApiResponse } from 'next';
import getDeliveries from '../../../services/develiery/getDeliveries';
import createDelivery from '../../../services/develiery/createDelivery';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case 'GET': {
      const deliveries = await getDeliveries();

      response.json(deliveries);
      break;
    }
    case 'POST': {
      const deliveryPayload = request.body;

      const delivery = await createDelivery(deliveryPayload);

      if (delivery) {
        return response.json({ success: true });
      }

      response.json({
        success: false,
        message: 'Could not create delivery',
      });
      break;
    }
    default:
      response.setHeader('Allow', ['GET', 'POST']);
      response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
