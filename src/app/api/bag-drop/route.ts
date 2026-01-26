
import { NextResponse } from 'next/server';
import { supabase } from '@utilities/supabaseClient';

export async function POST(req: Request) {
  const { address, bag_count } = await req.json();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bag_drop_requests')
    .insert([{ user_id: user.id, address, bag_count }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}

export async function GET() {
  const { data, error } = await supabase
    .from('bag_drop_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}
