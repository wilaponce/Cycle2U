import { NextResponse } from 'next/server';
import { supabase } from '@/utilities/supabaseClient';

export async function POST(req: Request) {
  const { location, description } = await req.json();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data, error } = await supabase
    .from('request_map')
    .insert([{ user_id: user.id, location, description }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}

export async function GET() {
  const { data, error } = await supabase.from('request_map').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}