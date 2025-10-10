import { useEffect, useState } from 'react';
import { messaging } from '../lib/firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

const useNotification = () => {
  const [notification, setNotification] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (messaging && typeof window !== 'undefined' && 'Notification' in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
            if (currentToken) {
              setToken(currentToken);
              axios.post('/api/Account/StoreToken', { token: currentToken })
                .then(() => console.log('FCM token stored successfully'))
                .catch((err) => console.error('Error storing FCM token:', err));
            }

            onMessage(messaging, (payload) => {
              console.log('Message received:', payload);
              setNotification(payload.notification);
            });
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };
    requestPermission();
  }, []);

  return { notification, token };
};

export default useNotification;
