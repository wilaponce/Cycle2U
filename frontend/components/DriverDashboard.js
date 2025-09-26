
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [driverLocation, setDriverLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    fetchPickupRequests();
    trackDriverLocation();
  }, []);

  const fetchPickupRequests = async () => {
    try {
      const response = await axios.get('/api/PickupRequests');
      setPickupRequests(response.data);
    } catch (error) {
      console.error('Error fetching pickup requests:', error);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await axios.put(`/api/PickupRequests/${requestId}/assign/${getDriverId()}`);
      updateRequestStatus(requestId, 'On the way');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      updateRequestStatus(requestId, 'Rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      await axios.put(`/api/PickupRequests/${requestId}/status`, { status });
      fetchPickupRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const getDriverId = () => {
    return localStorage.getItem('driverId');
  };

  const trackDriverLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDriverLocation({ latitude, longitude });
          sendLocationToServer(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      await axios.put(`/api/Drivers/${getDriverId()}/location`, { latitude, longitude });
    } catch (error) {
      console.error('Error sending location to server:', error);
    }
  };

  return (
    <div>
      <h2>Driver Dashboard</h2>
      <ul>
        {pickupRequests.map((request) => (
          <li key={request.id}>
            <p><strong>Address:</strong> {request.address}</p>
            <p><strong>Status:</strong> {request.status}</p>
            {request.status === 'Pending' && (
              <>
                <button onClick={() => acceptRequest(request.id)}>Accept</button>
                <button onClick={() => rejectRequest(request.id)}>Reject</button>
              </>
            )}
            {request.status === 'On the way' && (
              <button onClick={() => updateRequestStatus(request.id, 'Picked up')}>Mark as Picked Up</button>
            )}
            {request.status === 'Picked up' && (
              <button onClick={() => updateRequestStatus(request.id, 'Completed')}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDashboard;
