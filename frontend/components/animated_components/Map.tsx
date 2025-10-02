'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';

// Dynamically import to avoid SSR issues
const DynamicMapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
});

const Map = () => {
  const position: [number, number ] = [34.0522, -118.2437]; // Los Angeles
  
  return (
    <DynamicMapContainer
      center={position}
      zoom={13}
      style={{ height: '60vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
    </DynamicMapContainer>
  );
};

export default Map;