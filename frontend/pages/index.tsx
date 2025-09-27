import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Cycle2U</h1>
        <ul className={styles.navLinks}>
          {user && user.role === 'customer' && <li><Link href='/dashboard'>Dashboard</Link></li>}
          {user && user.role === 'driver' && <li><Link href='/driver-portal'>Driver Portal</Link></li>}
          {user && user.role === 'admin' && <li><Link href='/admin-panel'>Admin Panel</Link></li>}
          {user ? <li><button onClick={logout}>Logout</button></li> : <li><Link href='/login'>Login</Link></li>}
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/pickup-request">Pickup Request</Link></li>
          <li><Link href="/driver-portal">Driver Portal</Link></li>
          <li><Link href="/admin-panel">Admin Panel</Link></li>
        </ul>
      </nav>
      <main className={styles.main}>
        <h2>Welcome to Cycle2U</h2>
        <p>Cycle2U is a gig-based recycling pickup service that connects customers with local drivers to collect recyclable bins efficiently.</p>
        <section className={styles.onboarding}>
          <h3>How It Works</h3>
          <ol>
            <li>Sign up as a customer, driver, or admin.</li>
            <li>Customers request pickups for their bins.</li>
            <li>Drivers accept requests and complete pickups.</li>
            <li>Admins manage users and monitor operations.</li>
          </ol>
        </section>
      </main>
    </div>
  );
};

export default Home;
