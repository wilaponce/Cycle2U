import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    <MapContainer center={[34.0522, -118.2437]} zoom={10} style={{ height: '60vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {requests.map((req) => (
        <Marker key={req.id} position={[req.lat, req.lng]} icon={customIcon}>
          <Popup>
            <strong>{req.address}</strong><br />
            Status: {req.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
