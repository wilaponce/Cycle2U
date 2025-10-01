import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';

const Map = dynamic(() => import('../components/animated_components/Map'), { ssr: false });

interface Request {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'pending' | 'completed';
}

export default function Home() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetch('/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Error fetching requests:', err));
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

          <section style={{ marginBottom: '2rem' }}>
            <h2>Live Pickup Requests</h2>
            <Map requests={requests} />
          </section>

          <section>
            <h2>Why Choose Cycle2U?</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', width: '300px' }}>
                <h3>🌍 Purpose</h3>
                <p>We reduce waste and reward responsible recycling, creating a cleaner planet for all.</p>
              </div>
              <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', width: '300px' }}>
                <h3>🚚 Service</h3>
                <p>On-demand pickups using gig drivers. Just request a bin and we’ll handle the rest.</p>
              </div>
              <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', width: '300px' }}>
                <h3>💸 Rewards</h3>
                <p>Earn cash, invest in prizes, or save toward housing and essentials—all through recycling.</p>
              </div>
            </div>
          </section>
        </main>
      </AnimatedPageWrapper>
    </>
  );
}
