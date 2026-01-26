'use client';
import { useState, useEffect } from 'react';

export default function RequestMap() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await fetch('/api/request-map');
    const data = await res.json();
    setRequests(data.data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/request-map', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, description }),
    });
    setLocation('');
    setDescription('');
    fetchRequests();
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Request Map</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full border rounded px-3 py-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      <ul className="mt-4 space-y-2">
        {requests.map((req: any) => (
          <li key={req.id} className="border p-3 rounded">{req.location} - {req.description}</li>
        ))}
      </ul>
    </div>
  );
}
