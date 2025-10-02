// pages/RequestMap.tsx
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const center = {
  lat: 32.7157,
  lng: -117.1611, // San Diego
};

export default function RequestMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        style={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Add markers or other components here */}
      </Map>
    </APIProvider>
  );
}