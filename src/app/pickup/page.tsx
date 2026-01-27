'use client';
import React, { useState } from 'react';
import { supabase } from '@/utilities/supabaseClient';

export default function PickupPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const createPickup = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert('Login required'); return; }
    const { error } = await supabase.from('pickups').insert({ user_id: user.id, address, status: 'pending', date: new Date().toISOString() });
    if (error) alert(error.message); else alert('Pickup scheduled');
    setLoading(false);
  };

  return (<div className='p-6'><h1 className='text-xl mb-4'>Schedule Pickup</h1><input value={address} onChange={e=>setAddress(e.target.value)} placeholder='Enter address' className='border p-2'/><button onClick={createPickup} className='bg-green-500 text-white p-2'>{loading ? 'Scheduling...' : 'Schedule Pickup'}</button></div>);
}