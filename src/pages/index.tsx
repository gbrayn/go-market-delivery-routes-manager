import 'leaflet/dist/leaflet.css';
import { FormEvent, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AsyncSelect from 'react-select/async';

import { fetchLocalMapBox } from '../services/apiMapBox';
import Map from '../components/Map';
import { Delivery, Position } from '../interfaces';

const defaultMapPosition = { lat: -15.749997, lng: -47.9499962 };

const IndexPage = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const [position, setPosition] = useState<Position | null>(null);

  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [location, setLocation] = useState(defaultMapPosition);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const loadOptions = async (inputValue: any, callback: any) => {
    if (inputValue.length < 5) return;
    const places: any = [];

    const response = await fetchLocalMapBox(inputValue);
    response.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      });
    });

    callback(places);
  };

  const handleChangeSelect = (event: any) => {
    console.log('changed', event);
    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1],
    });

    setAddress({ label: event.place, value: event.place });

    setLocation({
      lng: event.coords[0],
      lat: event.coords[1],
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!address || !name) return;

    setDeliveries([
      ...deliveries,
      {
        id: uuidv4(),
        name,
        address: address?.value || '',
        complement,
        latitude: location.lat,
        longitude: location.lng,
      },
    ]);

    setName('');
    setAddress(null);
    setComplement('');
    setPosition(null);
  };

  return (
    <div id="page-map">
      <main>
        <form onSubmit={handleSubmit} className="landing-page-form">
          <fieldset>
            <legend>Entregas</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                placeholder="Digite o nome"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <AsyncSelect
                placeholder="Digite o endereço de entrega..."
                classNamePrefix="filter"
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleChangeSelect}
                value={address}
              />
            </div>

            <div className="input-block">
              <label htmlFor="complement">Complemento</label>
              <input
                type="text"
                placeholder="Apto / Nr / Casa..."
                id="complement"
                value={complement}
                onChange={(event) => setComplement(event.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
      <Map location={location} deliveries={deliveries} position={position} />
    </div>
  );
};

export default IndexPage;
