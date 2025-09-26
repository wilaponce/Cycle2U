
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const usePickupTracking = (pickupRequestId) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [pickupStatus, setPickupStatus] = useState('');

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/pickupTrackingHub')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log('SignalR connected');
        connection.invoke('JoinPickupRoom', pickupRequestId);
      })
      .catch(err => console.error('SignalR connection error:', err));

    connection.on('ReceiveDriverLocation', (location) => {
      setDriverLocation(location);
    });

    connection.on('ReceivePickupStatus', (status) => {
      setPickupStatus(status);
    });

    return () => {
      connection.stop();
    };
  }, [pickupRequestId]);

  return { driverLocation, pickupStatus };
};

export default usePickupTracking;
