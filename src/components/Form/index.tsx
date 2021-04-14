import { FormEvent, useState } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

import useGeolocation from '../useGeolocation';
import { fetchLocalMapBox } from '../../services/apiMapBox';

const Form = () => {
  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const { location, setLocation, setPosition } = useGeolocation();

  const loadOptions = async (
    inputValue: string,
    callback: (places: unknown[]) => void
  ) => {
    if (inputValue.length < 5) return;

    const response = await fetchLocalMapBox(inputValue);
    const places = response.features.map((item: any) => ({
      label: item.place_name,
      value: item.place_name,
      coords: item.center,
      place: item.place_name
    }));

    callback(places);
  };

  const handleChangeSelect = (event: any) => {
    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1]
    });

    setAddress({ label: event.place, value: event.place });

    setLocation({
      lng: event.coords[0],
      lat: event.coords[1]
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!address || !name) return;

    await axios.post('/api/delivery', {
      name,
      address: address?.value || '',
      complement,
      latitude: location.lat,
      longitude: location.lng,
      status: 'open'
    });

    setName('');
    setAddress(null);
    setComplement('');
    setPosition(null);
  };

  return (
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
  );
};

export default Form;
