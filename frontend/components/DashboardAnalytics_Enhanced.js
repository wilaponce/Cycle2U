
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardAnalytics() {
  const [summary, setSummary] = useState({ totalPickups: 0, activeDrivers: 0 });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/api/Admin/analytics')
      .then(res => res.json())
      .then(data => {
        setSummary({
          totalPickups: data.totalPickups,
          activeDrivers: data.activeDrivers
        });

        const ctx = document.getElementById('pickupChart');
        if (ctx && data.chart) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: data.chart.labels,
              datasets: [{
                label: 'Pickups per Day',
                data: data.chart.values,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">Total Pickups</h3>
          <p className="text-3xl">{summary.totalPickups}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">Active Drivers</h3>
          <p className="text-3xl">{summary.activeDrivers}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Pickup Trends</h3>
        <canvas id="pickupChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}
