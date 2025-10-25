

import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./navbar'), {
  ssr: false, // optional: disables server-side rendering
  loading: () => <div>Loading Navbar...</div>,
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
