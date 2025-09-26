
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardAnalytics = () => {
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [driverActivityData, setDriverActivityData] = useState(null);

  useEffect(() => {
    fetch('/api/Admin/analytics')
      .then(response => response.json())
      .then(data => {
        const userGrowth = {
          labels: data.userGrowth.map(entry => entry.date),
          datasets: [{
            label: 'User Growth',
            data: data.userGrowth.map(entry => entry.count),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          }]
        };
        const driverActivity = {
          labels: data.activeDrivers.map(entry => entry.date),
          datasets: [{
            label: 'Active Drivers',
            data: data.activeDrivers.map(entry => entry.count),
            backgroundColor: 'rgba(153,102,255,0.6)',
          }]
        };
        setUserGrowthData(userGrowth);
        setDriverActivityData(driverActivity);
      })
      .catch(error => console.error('Error fetching analytics data:', error));
  }, []);

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-xl font-semibold">Dashboard Analytics</h2>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">User Growth Over Time</h3>
        {userGrowthData ? <Line data={userGrowthData} /> : <p>Loading...</p>}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Active Driver Trends</h3>
        {driverActivityData ? <Bar data={driverActivityData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
