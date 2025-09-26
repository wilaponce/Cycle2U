
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

const UserDashboard = ({ userId }) => {
  const [requests, setRequests] = useState([]);
  const [trackingData, setTrackingData] = useState({});
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Fetch user's pickup request history
    axios.get(`/api/PickupRequests/user/${userId}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error('Error fetching requests:', err));
  }, [userId]);

  useEffect(() => {
    // Setup SignalR connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('/pickupTrackingHub')
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
        requests.forEach(req => {
          newConnection.invoke('JoinPickupRoom', req.id);
        });
      })
      .catch(err => console.error('SignalR Connection Error:', err));

    newConnection.on('ReceivePickupStatus', (requestId, status) => {
      setTrackingData(prev => ({
        ...prev,
        [requestId]: {
          ...prev[requestId],
          status
        }
      }));
    });

    newConnection.on('ReceiveDriverLocation', (requestId, location) => {
      setTrackingData(prev => ({
        ...prev,
        [requestId]: {
          ...prev[requestId],
          driverLocation: location
        }
      }));
    });

    setConnection(newConnection);

    return () => {
      if (newConnection) newConnection.stop();
    };
  }, [requests]);

  const cancelRequest = (requestId) => {
    axios.put(`/api/PickupRequests/${requestId}/cancel`)
      .then(() => {
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Cancelled' } : r));
      })
      .catch(err => console.error('Cancel Error:', err));
  };

  const rescheduleRequest = (requestId, newTime) => {
    axios.put(`/api/PickupRequests/${requestId}/reschedule`, { newTime })
      .then(() => {
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, scheduledTime: newTime } : r));
      })
      .catch(err => console.error('Reschedule Error:', err));
  };

  return (
    <div>
      <h2>Your Pickup Requests</h2>
      <ul>
        {requests.map(req => (
          <li key={req.id}>
            <p><strong>Type:</strong> {req.type}</p>
            <p><strong>Status:</strong> {trackingData[req.id]?.status || req.status}</p>
            <p><strong>Driver ETA:</strong> {trackingData[req.id]?.driverLocation ? `Lat: ${trackingData[req.id].driverLocation.latitude}, Lng: ${trackingData[req.id].driverLocation.longitude}` : 'Not available'}</p>
            {req.status === 'Pending' && (
              <>
                <button onClick={() => cancelRequest(req.id)}>Cancel</button>
                <button onClick={() => {
                  const newTime = prompt('Enter new time (YYYY-MM-DD HH:mm):');
                  if (newTime) rescheduleRequest(req.id, newTime);
                }}>Reschedule</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
