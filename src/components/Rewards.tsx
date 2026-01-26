'use client';
import { useEffect, useState } from 'react';

export default function Rewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const res = await fetch('/api/rewards');
      const data = await res.json();
      setRewards(data.data);
    };
    fetchRewards();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Rewards</h2>
      <ul className="space-y-2">
        {rewards.map((reward: any) => (
          <li key={reward.id} className="border p-3 rounded">{reward.name} - {reward.points} points</li>
        ))}
      </ul>
    </div>
  );
}
