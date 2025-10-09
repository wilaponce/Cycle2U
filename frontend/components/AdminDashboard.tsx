import React, { useEffect, useState } from 'react';
import { getUsers, getDrivers, getRequests, assignRole, createDriver, assignDriverToRequest, deleteRequest } from '../services/adminService';
import { User, Driver, PickupRequest, Role } from '../types';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [requests, setRequests] = useState<PickupRequest[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>('User');
  const [newDriverName, setNewDriverName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, driversRes, requestsRes] = await Promise.all([getUsers(), getDrivers(), getRequests()]);
      setUsers(usersRes.data);
      setDrivers(driversRes.data);
      setRequests(requestsRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAssignRole = async (userId: string) => {
    try {
      await assignRole(userId, selectedRole);
      fetchData();
    } catch (error) {
      console.error("Error assigning role", error);
    }
  };

  const handleCreateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName) return;
    try {
      await createDriver({ name: newDriverName, isAvailable: true });
      setNewDriverName('');
      fetchData();
    } catch (error) {
      console.error("Error creating driver", error);
    }
  };

  const handleAssignDriver = async (requestId: string, driverId: string) => {
    try {
      await assignDriverToRequest(requestId, driverId);
      fetchData();
    } catch (error) {
      console.error("Error assigning driver", error);
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    try {
      await deleteRequest(requestId);
      fetchData();
    } catch (error) {
      console.error("Error deleting request", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        {/* Users Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <div className="flex items-center mb-4">
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as Role)} className="p-2 border rounded">
              <option value="User">User</option>
              <option value="Driver">Driver</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <ul className="space-y-2">
            {users.map(user => (
              <li key={user.id} className="flex justify-between items-center p-2 border rounded">
                <span>{user.email} - {user.roles.join(', ')}</span>
                <button onClick={() => handleAssignRole(user.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Assign Role</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Drivers Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Drivers</h3>
          <form onSubmit={handleCreateDriver} className="flex items-center mb-4">
            <input
              type="text"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              placeholder="New Driver Name"
              className="p-2 border rounded flex-grow"
            />
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded ml-2">Add Driver</button>
          </form>
          <ul className="space-y-2">
            {drivers.map(driver => (
              <li key={driver.id} className="flex justify-between items-center p-2 border rounded">
                <span>{driver.name} - {driver.isAvailable ? 'Available' : 'Unavailable'}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pickup Requests Section */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Pickup Requests</h3>
          <ul className="space-y-2">
            {requests.map(request => (
              <li key={request.id} className="p-2 border rounded">
                <p>User: {request.userId}</p>
                <p>Status: {request.status}</p>
                <div className="flex items-center mt-2">
                  <select
                    onChange={(e) => handleAssignDriver(request.id, e.target.value)}
                    value={request.driverId || ''}
                    className="p-2 border rounded flex-grow"
                    disabled={request.status !== 'pending'}
                  >
                    <option value="" disabled>Assign a driver</option>
                    {drivers.filter(d => d.isAvailable).map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDeleteRequest(request.id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="col-span-1">
        <Map drivers={drivers} requests={requests} />
      </div>
    </div>
  );
};

export default AdminDashboard;
