import Navbar from '@/components/Navbar';
export default function Register() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow'><h2 className='text-3xl font-bold mb-4'>Create Account</h2><form className='space-y-4'><input type='email' placeholder='Email' className='input-field' /><input type='password' placeholder='Password' className='input-field' /><button className='btn-primary w-full'>Register</button></form></div></div>);}
