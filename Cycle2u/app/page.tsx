import Navbar from '@/components/Navbar';
export default function Page() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><section className='text-center py-20'><h1 className='text-5xl font-extrabold text-green-600 mb-4'>Welcome to Cycle2u</h1><p className='text-lg text-gray-700 mb-6'>Empowering communities through mobile recycling</p><a href='/login' className='btn-primary'>Get Started</a></section></div>);}
