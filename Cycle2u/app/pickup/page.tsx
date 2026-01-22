import Navbar from '@/components/Navbar';
export default function Pickup() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow'><h2 className='text-3xl font-bold mb-4'>Schedule Pickup</h2><form className='space-y-4'><input type='date' className='input-field' /><input type='time' className='input-field' /><button className='btn-primary w-full'>Confirm Pickup</button></form></div></div>);}
