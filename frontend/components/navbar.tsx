
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/layout.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button onClick={() => setMenuOpen(!menuOpen)} className={styles.hamburger}>☰</button>
        <Link href="/" className={styles.homeIcon}>🏠</Link>
        {menuOpen && (
          <div className={styles.menu}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/driver">Driver Portal</Link>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <button onClick={() => setUserOpen(!userOpen)} className={styles.userIcon}>👤</button>
        {userOpen && (
          <div className={styles.userMenu}>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
