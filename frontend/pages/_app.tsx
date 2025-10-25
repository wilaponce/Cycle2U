
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import 'leaflet/dist/leaflet.css'; // Add this line
const Layout = dynamic(() => import('../components/layout'), {
  loading: () => <div>Loading Layout...</div>,
});
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
