import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';
interface Request {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'pending' | 'completed';
}
const apiKeyValue = process.env.GOOGLE_MAPS_API_KEY?.toString();
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { env } from 'process';
import { getHash } from 'next/dist/server/image-optimizer';
import getConfig from 'next/config';
import { ApiError } from 'next/dist/server/api-utils';

export default function Home() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetch('/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Error fetching requests:', err));
  }, []);
  
                    
  const MapComponent = dynamic(() => import('../components/animated_components/RequestMap'), { ssr: false });

  return (
    <>
      <Head>
        <title>Cycle2U | Recycling Made Easy</title>
      </Head>
      <AnimatedPageWrapper>
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>♻️ Cycle2U</h1>
            <p>Empowering communities through smart recycling and gig-driven pickups.</p>
          </section>
          <APIProvider apiKey={String(apiKeyValue)}>
                <Map
                      style={{width: '100vw', height: '100vh'}}
                            defaultCenter={{lat: 22.54992, lng: 0}}
                                  defaultZoom={3}
                                        gestureHandling='greedy'
                                              disableDefaultUI
                                                  />
                                                    </APIProvider>
        

        
            </main>
      </AnimatedPageWrapper>
    </>
  );
}
