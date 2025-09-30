import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';
import AnimatedCard from '../components/animated_components/AnimatedCard';
import AnimatedButton from '../components/animated_components/AnimatedButton';

export default function Dashboard() {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedCard><a href="/requests">View Requests</a></AnimatedCard>
          <AnimatedCard><a href="/drivers">Driver Management</a></AnimatedCard>
          <AnimatedCard><a href="/admin-panel">Admin Panel</a></AnimatedCard>
        </div>
        <div className="flex justify-center space-x-4">
          <AnimatedButton><a href="/requests/create" className="px-6 py-2 bg-green-600 text-white rounded">Create Request</a></AnimatedButton>
          <AnimatedButton><a href="/reports" className="px-6 py-2 bg-green-600 text-white rounded">View Reports</a></AnimatedButton>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}