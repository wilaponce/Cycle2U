import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout';
import '../styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}