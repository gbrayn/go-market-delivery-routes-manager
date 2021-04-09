import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '../config';

// const mapPackageIcon = Leaflet.icon({
//   iconUrl: '/package.svg',
//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [170, 2],
// });

// const mapPinIcon = Leaflet.icon({
//   iconUrl: '/pin.svg',
//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [170, 2],
// });

const MapContainer = ReactMapboxGl({
  accessToken: config.mapbox.token,
});

const Map = ({ location, position, deliveries }: any) => (
  <MapContainer
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}
    center={location}
  >
    {' '}
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={[-23.59167, -48.05306]} />
    </Layer>
    {deliveries.map((delivery) => (
      <Marker
        coordinates={[delivery.longitude, delivery.latitude]}
        anchor="center"
      >
        <img src="/package.svg" alt="" width="58" height="68" />
      </Marker>
    ))}
  </MapContainer>
);
export default Map;
