import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Request {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'pending' | 'completed';
}

interface MapProps {
  requests: Request[];
}

const RequestMap = ({ requests }: MapProps) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {requests.map((request) => (
        <Marker key={request.id} position={[request.lat, request.lng]}>
          <Popup>
            {request.address} <br /> Status: {request.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RequestMap;
