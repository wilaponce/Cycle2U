import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/layout';
import '../styles/globals.css';
import 'leaflet/dist/leaflet.css'; // Add this line

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
