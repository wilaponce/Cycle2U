import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const center: [number, number] = [34.0522, -118.2437]; // Los Angeles

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: '60vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={`© `}
      />
    </MapContainer>
  );
};

export default Map;