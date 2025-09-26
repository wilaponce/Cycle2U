
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function RequestMap({ requestId }) {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`/api/PickupRequests/${requestId}`)
      .then(res => setRequest(res.data))
      .catch(err => console.error(err));
  }, [requestId]);

  if (!request) return <p>Loading...</p>;

  return (
    <MapContainer center={[request.latitude, request.longitude]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[request.latitude, request.longitude]}>
        <Popup>
          Pickup Request Status: {request.status}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
