import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Request {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'pending' | 'completed';
}

interface Props {
  requests: Request[];
}

const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
 
 
const Map = ({ requests }: Props) => {
  return (
    <MapContainer
      center={[34.0522, -118.2437]} // Los Angeles
      zoom={10}
      style={{ height: '60vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {requests.map((req) => (
        <Marker key={req.id} position={[req.lat, req.lng]} icon={customIcon}>
          <Popup>{req.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
