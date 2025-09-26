import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardAnalytics() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('/api/Admin/analytics').then(res => {
      setData({
        labels: res.data.labels,
        datasets: [
          {
            label: 'Pickup Requests',
            data: res.data.values,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Dashboard Analytics</h2>
      <Bar data={data} />
    </div>
  );
}
