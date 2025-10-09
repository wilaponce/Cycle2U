import { createContext, useContext, useState, useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import apiService from '../services/apiService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You would typically fetch the user profile here
      // For now, we'll just assume the user is authenticated if a token exists
      setUser({ id: '1', name: 'Admin User', email: 'admin@example.com', roles: ['Admin'] });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Fetch user profile after login
    setUser({ id: '1', name: 'Admin User', email: 'admin@example.com', roles: ['Admin'] });
    router.push('/admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiService.defaults.headers.common['Authorization'];
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredRoles: string[] = []) => {
  const WithAuthComponent = (props: P) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      } else if (!isLoading && requiredRoles.length > 0 && !requiredRoles.some(role => user?.roles.includes(role))) {
        router.push('/unauthorized'); // Or a 404 page
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading || !isAuthenticated) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};