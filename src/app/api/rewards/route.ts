import { NextResponse } from 'next/server';
import { supabase } from '@/utilities/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('rewards').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}