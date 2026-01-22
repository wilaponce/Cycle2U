import Navbar from '@/components/Navbar';
export default function Driver() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><div className='max-w-4xl mx-auto mt-10'><h2 className='text-4xl font-bold mb-6'>Driver Portal</h2><button className='btn-primary mb-4'>Toggle Availability</button><div className='card'>Assigned Pickups: None</div></div></div>);}
