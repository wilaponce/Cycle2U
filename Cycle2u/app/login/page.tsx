import Navbar from '@/components/Navbar';
import { signInWithGoogle, signInWithFacebook } from '@/utils/supabase/server';
export default function Login() {
  return (<div className='min-h-screen bg-gray-50'><Navbar /><div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow'><h2 className='text-3xl font-bold mb-4'>Login</h2><div className='space-y-4'><button onClick={signInWithGoogle} className='btn-primary w-full'>Login with Google</button><button onClick={signInWithFacebook} className='btn-secondary w-full'>Login with Facebook</button></div></div></div>);}
