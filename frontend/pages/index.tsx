
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import AnimatedPageWrapper from '../components/AnimatedPageWrapper';
import styles from '../styles/Home.module.css';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

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
        <main className={styles.main}>
          <section className={styles.hero}>
            <h1>♻️ Cycle2U</h1>
            <p>Empowering communities through smart recycling and gig-driven pickups.</p>
          </section>

          <section className={styles.mapSection}>
            <h2>Live Pickup Requests</h2>
            <Map requests={requests} />
          </section>

          <section className={styles.features}>
            <h2>Why Choose Cycle2U?</h2>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h3>🌍 Purpose</h3>
                <p>We reduce waste and reward responsible recycling, creating a cleaner planet for all.</p>
              </div>
              <div className={styles.card}>
                <h3>🚚 Service</h3>
                <p>On-demand pickups using gig drivers. Just request a bin and we’ll handle the rest.</p>
              </div>
              <div className={styles.card}>
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
