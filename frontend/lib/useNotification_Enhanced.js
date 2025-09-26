import { useEffect, useState } from 'react';
import { messaging } from '../lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' }).then((currentToken) => {
            if (currentToken) {
              setToken(currentToken);
              axios.post('/api/Account/StoreToken', { token: currentToken })
                .then(() => console.log('FCM token stored successfully'))
                .catch((err) => console.error('Error storing FCM token:', err));
            }
          }).catch((err) => {
            console.error('Error retrieving FCM token:', err);
          });
        }
      });
    }

    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      setNotification(payload.notification);
    });
  }, []);

  return { notification, token };
};

export default useNotification;

// Listen for pickup completed event
useEffect(() => {
  onMessage(messaging, (payload) => {
    if (payload?.notification?.title === 'Pickup Completed') {
      toast.success(payload.notification.body || 'Your pickup has been completed!');
    }
  });
}, []);
