'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else window.location.href = '/dashboard';
  };

  return (<div className='p-6'><h1 className='text-xl mb-4'>Register</h1><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='border p-2'/><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='border p-2'/><button onClick={handleRegister} className='bg-green-500 text-white p-2'>Register</button></div>);
}