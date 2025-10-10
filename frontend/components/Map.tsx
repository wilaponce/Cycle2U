import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Driver, PickupRequest } from '../types';

interface MapProps {
  drivers: Driver[];
  requests: PickupRequest[];
}

const Map: React.FC<MapProps> = ({ drivers, requests }) => {
  const center: any = [40.7128, -74.0060];
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {drivers.map(driver => (
        driver.location && (
          <Marker key={`driver-${driver.id}`} position={[driver.location.latitude, driver.location.longitude]}>
            <Popup>
              Driver: {driver.name} <br />
              Status: {driver.isAvailable ? 'Available' : 'Unavailable'}
            </Popup>
          </Marker>
        )
      ))}
      {requests.map(request => (
        <Marker key={`request-${request.id}`} position={[request.location.latitude, request.location.longitude]}>
          <Popup>
            User: {request.userId} <br />
            Status: {request.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;