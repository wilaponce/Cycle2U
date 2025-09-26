import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '', role: '', avatar: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/Account/Profile').then(res => setUser(res.data));
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = e => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('role', user.role);
    if (avatarFile) formData.append('avatar', avatarFile);
    await axios.put('/api/Account/Profile', formData);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={user.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" value={user.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <select name="role" value={user.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="User">User</option>
          <option value="Driver">Driver</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="file" onChange={handleAvatarChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
