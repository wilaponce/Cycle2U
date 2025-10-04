// pages/Home.tsx
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

const MapComponent = dynamic(() => import('../components/animated_components/RequestMap'), {
  ssr: false,
});

export default function Home() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetch('/api/requests')
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Error fetching requests:', err));
  }, []);
  
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

          <MapComponent requests={requests} />
        </main>
      </AnimatedPageWrapper>
    </>
  );
}