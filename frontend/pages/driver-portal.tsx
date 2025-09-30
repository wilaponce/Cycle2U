import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';

export default function DriverPortal() {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Driver Portal</h1>
        <p>Manage pickups, schedules, and reports.</p>
      </div>
    </AnimatedPageWrapper>
  );
}