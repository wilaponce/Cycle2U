import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../../styles/RequestMap.module.css';

// Fix for default icon issue with webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});


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

const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


function MapFlyTo({ center, zoom }: { center: L.LatLngExpression, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}


export default function RequestMap({ requests }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [flyToCenter, setFlyToCenter] = useState<L.LatLngExpression | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setFlyToCenter([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert('Location not found');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    return (
        <div className={styles.mapWrapper}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Search address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
            <MapContainer center={[22.54992, 0]} zoom={3} style={{ height: '100%', width: '100%' }} className={styles.mapContainer}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {requests.map(req => (
                    <Marker
                        key={req.id}
                        position={[req.lat, req.lng]}
                        icon={req.status === 'pending' ? orangeIcon : greenIcon}
                    >
                        <Popup>
                            <strong>{req.address}</strong>
                            <br />
                            <button onClick={() => window.open(`https://www.google.com/maps?q=&layer=c&cbll=${req.lat},${req.lng}`, '_blank')}>
                                Street View
                            </button>
                        </Popup>
                    </Marker>
                ))}
                {flyToCenter && <MapFlyTo center={flyToCenter} zoom={14} />}
            </MapContainer>
        </div>
    );
}
