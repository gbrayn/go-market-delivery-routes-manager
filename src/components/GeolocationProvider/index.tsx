import React, { useState, useEffect } from 'react';

interface IPosition {
  longitude: number;
  latitude: number;
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IGeolocationContext {
  position: IPosition | null;
  setPosition: (position: IPosition | null) => void;
  location: ILocation;
  setLocation: (location: ILocation) => void;
}

export const GeolocationContext = React.createContext(
  {} as IGeolocationContext
);

const defaultMapPosition = { lat: -15.749997, lng: -47.9499962 };

const GeolocationProvider: React.FC = ({ children }) => {
  const [position, setPosition] = useState<IPosition | null>(null);
  const [location, setLocation] = useState(defaultMapPosition);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        const { latitude, longitude } = currentPosition.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <GeolocationContext.Provider
      value={{ position, setPosition, location, setLocation }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

export default GeolocationProvider;
