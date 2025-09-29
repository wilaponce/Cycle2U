import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const protectedRoutes: { [key: string]: string[] } = {
  '/dashboard': ['customer'],
  '/driver-portal': ['driver'],
  '/admin-panel': ['admin']
};

function AuthWrapper({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const allowedRoles = protectedRoutes[router.pathname];
    if (allowedRoles && (!user || !user.role || !allowedRoles.includes(user.role))) {
      router.push(user ? '/' : '/login');
    }
  }, [router.pathname, user]);

  return <Component {...pageProps} />;
}

function MyApp(props: AppProps) {
  return (
    <AuthProvider>
      <AuthWrapper {...props} />
    </AuthProvider>
  );
}
export default MyApp;
