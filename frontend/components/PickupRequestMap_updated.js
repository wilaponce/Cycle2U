
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function PickupRequestMap() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Pending');
  const [driverLocation, setDriverLocation] = useState(null);

  const handleSubmit = async () => {
    const response = await axios.post('/api/PickupRequests', {
      address,
      latitude: position[0],
      longitude: position[1],
      status: 'Searching for Driver'
    });
    setStatus('Searching for Driver');
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get('/api/PickupRequests/latest');
      if (response.data) {
        setStatus(response.data.status);
        if (response.data.driverLatitude && response.data.driverLongitude) {
          setDriverLocation([response.data.driverLatitude, response.data.driverLongitude]);
        }
      }
    }, 5000);
    return (
    <div>
      <p>Status: {pickupStatus}</p>
    </div>
) => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Status: {pickupStatus}</p>
    </div>

    <div>
      <h2>Request Pickup</h2>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Request</button>
      <p>Status: {status}</p>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Your Location</Popup>
        </Marker>
        {driverLocation && (
          <Marker position={driverLocation}>
            <Popup>Driver Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
