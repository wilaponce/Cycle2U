
import React from 'react';
import AnimatedPageWrapper from '/components/animated_components/AnimatedPageWrapper';
import AnimatedCard from '/components/animated_components/AnimatedCard';
import AnimatedButton from '/components/animated_components/AnimatedButton';

export default function Dashboard() {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          /requests
          /drivers
          /admin-panel
        </div>
        <div className="flex justify-center space-x-4">
          /requests/create
          /reports
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}
