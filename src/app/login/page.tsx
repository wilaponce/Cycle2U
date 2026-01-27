
'use client';
import React, { useState } from 'react';
import { supabase } from '@/utilities/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}
          onClick={handleEmailLogin}>
          Sign In with Email
        </button>
        <button
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px' }}
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
          Sign In with Google
        </button>
      </div>
    </main>
  );
}
