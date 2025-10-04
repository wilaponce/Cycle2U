
// components/animated_components/RequestMap.tsx
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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

export default function RequestMap({ requests }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 22.54992],
      zoom: 3,
    });
    requests.forEach((req) => {
      new maplibregl.Marker({ color: req.status === 'pending' ? 'orange' : 'green' })
        .setLngLat([req.lng, req.lat])
        .setPopup(new maplibregl.Popup().setText(req.address))
        .addTo(map);
    });

    return () => map.remove();
  }, [requests]);

  return <div ref={mapRef} style={{ width: '60vw', height: '60vh' }} />;
}                     