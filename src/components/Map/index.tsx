import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import config from '../../config';

import useGeolocation from '../useGeolocation';
import { Delivery } from '../../interfaces';

const MapContainer = ReactMapboxGl({
  accessToken: config.mapbox.token
});

const Map = ({ deliveries }: any) => {
  const [showPopup, toggleShowPopup] = useState('');

  const { location, position } = useGeolocation();

  return (
    <MapContainer
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={location}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-23.59167, -48.05306]} />
      </Layer>

      {deliveries &&
        deliveries.map((delivery: Delivery) => {
          const { _id: id } = delivery;
          const popupKey = `popup_${id}`;

          return (
            <div>
              {showPopup === popupKey && (
                <Popup
                  className="popup"
                  coordinates={[delivery.longitude, delivery.latitude]}
                >
                  <p>{delivery.name}</p>
                </Popup>
              )}
              <Marker
                coordinates={[delivery.longitude, delivery.latitude]}
                anchor="center"
                onClick={() =>
                  toggleShowPopup((prevState) => (prevState ? '' : popupKey))
                }
              >
                <img src="/package.svg" alt="" width="58" height="68" />
              </Marker>
            </div>
          );
        })}
      {position && (
        <Marker
          coordinates={[position.longitude, position.latitude]}
          anchor="center"
        >
          <img src="/pin.svg" alt="" width="58" height="68" />
        </Marker>
      )}
    </MapContainer>
  );
};
export default Map;
