
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardAnalytics() {
  const [summary, setSummary] = useState({ totalPickups: 0, activeDrivers: 0 });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

useEffect(() => {
  const userGrowthCtx = document.getElementById('userGrowthChart');
  const driverTrendCtx = document.getElementById('driverTrendChart');

  new Chart(userGrowthCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Users',
        data: [10, 20, 35, 50, 70],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }]
    }
  });

  new Chart(driverTrendCtx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Active Drivers',
        data: [5, 8, 6, 9, 7],
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }]
    }
  });
}, []);

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
        
<div className="bg-white p-4 rounded shadow mt-6">
  <h2 className="text-lg font-semibold mb-2">User Growth Over Time</h2>
  <canvas id="userGrowthChart"></canvas>
</div>


<div className="bg-white p-4 rounded shadow mt-6">
  <h2 className="text-lg font-semibold mb-2">Active Driver Trends</h2>
  <canvas id="driverTrendChart"></canvas>
</div>

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
