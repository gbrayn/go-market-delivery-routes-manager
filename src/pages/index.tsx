import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import GeolocationProvider from '../components/GeolocationProvider';
import Form from '../components/Form';
import Map from '../components/Map';
import { Delivery } from '../interfaces';

const IndexPage = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    async function getDeliveries() {
      const response = await axios.get('/api/delivery');

      setDeliveries(response.data);
    }

    getDeliveries();
  }, [deliveries]);

  return (
    <div id="page-map">
      <GeolocationProvider>
        <Form />
        <Map deliveries={deliveries} />
      </GeolocationProvider>
    </div>
  );
};

export default IndexPage;
