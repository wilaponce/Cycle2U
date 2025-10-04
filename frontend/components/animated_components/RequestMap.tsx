import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from '../../styles/RequestMap.module.css';

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
    const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapRef.current,
            style: 'https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}',
            center: [0, 22.54992],
            zoom: 3,
        });
        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        setMapInstance(map);

        requests.forEach((req) => {
            const marker = new maplibregl.Marker({ color: req.status === 'pending' ? 'orange' : 'green' })
                .setLngLat([req.lng, req.lat])
                .setPopup(
                    new maplibregl.Popup().setHTML(
                        `<strong>${req.address}</strong><br/>
                                                                                                                    <button onclick="window.open('https://www.google.com/maps?q=&layer=c&cbll=${req.lat},${req.lng}', '_blank')">
                                                                                                                                   Street View
                                                                                                                                                </button>`
                    )
                )
                .addTo(map);
        });

        return () => map.remove();
    }, [requests]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery || !mapInstance) return;
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                mapInstance.flyTo({ center: [parseFloat(lon), parseFloat(lat)], zoom: 14 });
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
            <div className={styles.mapContainer} ref={mapRef} />
        </div>
    );
}        