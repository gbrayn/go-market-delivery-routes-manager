import { useContext } from 'react';
import { GeolocationContext } from '../GeolocationProvider';

const useGeolocation = () => {
  const context = useContext(GeolocationContext);

  return context;
};

export default useGeolocation;
