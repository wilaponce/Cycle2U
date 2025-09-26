
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRole, setSelectedRole] = useState('User');

  useEffect(() => {
    fetchUsers();
    fetchDrivers();
    fetchRequests();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('/api/Admin/users');
    setUsers(res.data);
  };

  const fetchDrivers = async () => {
    const res = await axios.get('/api/Admin/drivers');
    setDrivers(res.data);
  };

  const fetchRequests = async () => {
    const res = await axios.get('/api/Admin/requests');
    setRequests(res.data);
  };

  const assignRole = async (userId) => {
    await axios.post(`/api/Admin/users/${userId}/assign-role`, { role: selectedRole });
    fetchUsers();
  };

  const updateDriverAvailability = async (driverId, available) => {
    await axios.put(`/api/Admin/drivers/${driverId}/availability`, { available });
    fetchDrivers();
  };

  const updateDriverLocation = async (driverId, latitude, longitude) => {
    await axios.put(`/api/Admin/drivers/${driverId}/location`, { latitude, longitude });
    fetchDrivers();
  };

  const updateRequestStatus = async (requestId, status) => {
    await axios.put(`/api/Admin/requests/${requestId}/status`, { status });
    fetchRequests();
  };

  const deleteRequest = async (requestId) => {
    await axios.delete(`/api/Admin/requests/${requestId}`);
    fetchRequests();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Users</h3>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Driver">Driver</option>
          <option value="Admin">Admin</option>
        </select>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.email} - {user.role}
              <button onClick={() => assignRole(user.id)}>Assign Role</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Drivers</h3>
        <ul>
          {drivers.map(driver => (
            <li key={driver.id}>
              {driver.name} - Available: {driver.available ? 'Yes' : 'No'}
              <button onClick={() => updateDriverAvailability(driver.id, !driver.available)}>Toggle Availability</button>
              <button onClick={() => updateDriverLocation(driver.id, 40.7128, -74.0060)}>Update Location</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Pickup Requests</h3>
        <ul>
          {requests.map(request => (
            <li key={request.id}>
              {request.status} - Scheduled: {request.scheduledTime}
              <button onClick={() => updateRequestStatus(request.id, 'Completed')}>Mark Completed</button>
              <button onClick={() => deleteRequest(request.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
