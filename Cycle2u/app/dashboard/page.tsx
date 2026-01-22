import Navbar from '@/components/Navbar';
import RewardsDashboard from '@/components/RewardsDashboard';
export default function Dashboard() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><div className='max-w-4xl mx-auto mt-10'><h2 className='text-4xl font-bold mb-6'>Your Dashboard</h2><RewardsDashboard points={120} /><a href='/pickup' className='btn-primary mt-6 inline-block'>Schedule Pickup</a></div></div>);}
