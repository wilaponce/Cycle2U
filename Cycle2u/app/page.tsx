'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utilities/supabaseClient';

export default function DashboardPage() {
  const [pickups, setPickups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data: pickupsData } = await supabase.from('pickups').select('*').eq('user_id', user.id);
      const { data: transactionsData } = await supabase.from('transactions').select('*').eq('user_id', user.id);
      const { data: historyData } = await supabase.from('history').select('*').eq('user_id', user.id);

      setPickups(pickupsData || []);
      setTransactions(transactionsData || []);
      setHistory(historyData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className='p-6'>Loading dashboard...</div>;

  return (<div className='p-6'>
    <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
    <section><h2 className='text-xl font-semibold'>Pickups</h2><ul>{pickups.map(p => <li key={p.id}>{p.status} - {p.date}</li>)}</ul></section>
    <section><h2 className='text-xl font-semibold mt-4'>Transactions</h2><ul>{transactions.map(t => <li key={t.id}>${t.amount} - {t.status}</li>)}</ul></section>
    <section><h2 className='text-xl font-semibold mt-4'>History</h2><ul>{history.map(h => <li key={h.id}>{h.action} - {h.date}</li>)}</ul></section>
  </div>);
}