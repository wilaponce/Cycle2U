'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const Map = () => {
  const center: [number, number] = [34.0522, -118.2437];

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: '60vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={`© OpenStreetMap contributors`}
      />
    </MapContainer>
  );
};

export default Map;