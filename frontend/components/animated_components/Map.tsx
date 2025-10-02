'use client'; // Required for Next.js App Router

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const center: [number, number] = [34.0522, -118.2437]; // Los Angeles

  return (
    <MapContainer
      center={center as [number, number]} // Explicit tuple type
      zoom={10}
      style={{ height: '60vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
    </MapContainer>
  );
};

export default Map;
