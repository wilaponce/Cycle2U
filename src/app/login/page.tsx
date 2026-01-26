'use client';
import React, { useState } from 'react';
import { supabase } from '@utilities/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message); else window.location.href = '/dashboard';
  };

  return (<div className='p-6'><h1 className='text-xl mb-4'>Login</h1><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='border p-2'/><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='border p-2'/><button onClick={handleLogin} className='bg-green-500 text-white p-2'>Login</button></div>);
}