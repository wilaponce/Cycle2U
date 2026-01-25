'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function DriverPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data } = await supabase.from('pickups').select('*').eq('driver_id', user.id);
      setAssignments(data || []);
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  if (loading) return <div className='p-6'>Loading driver dashboard...</div>;

  return (<div className='p-6'><h1 className='text-2xl font-bold mb-4'>Driver Dashboard</h1><ul>{assignments.map(a => <li key={a.id}>{a.status} - {a.date}</li>)}</ul></div>);
}