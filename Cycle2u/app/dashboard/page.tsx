import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export default async function Dashboard() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${cookies().get('sb-access-token')?.value}` } } }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <main><h1>Access Denied</h1></main>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </main>
  );
}
