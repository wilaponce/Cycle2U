
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/utilities/supabaseClient';

export default function BagDrop() {
  const [address, setAddress] = useState('');
  const [bagCount, setBagCount] = useState(1);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await fetch('/api/bag-drop');
    const data = await res.json();
    setRequests(data.data);
  };

  useEffect(() => {
    fetchRequests();

    // Real-time subscription
    const channel = supabase
      .channel('bag_drop_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bag_drop_requests' }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/bag-drop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, bag_count: bagCount }),
    });
    if (res.ok) {
      setAddress('');
      setBagCount(1);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Request a Bag Drop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="number"
          value={bagCount}
          onChange={(e) => setBagCount(Number(e.target.value))}
          min={1}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6 mb-2">Your Requests</h3>
      <ul className="space-y-2">
        {requests.map((req: any) => (
          <li key={req.id} className="border p-3 rounded">
            <span className="font-medium">{req.address}</span> - {req.bag_count} bags - <span className="text-gray-600">{req.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
