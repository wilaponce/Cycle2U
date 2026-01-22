import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function createClient(cookieStore) {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
    cookies: {
      get(name) { return cookieStore.get(name)?.value; },
      set(name, value, options) { cookieStore.set({ name, value, ...options }); },
      remove(name, options) { cookieStore.set({ name, value: '', ...options }); }
    }
  });
}

export async function signInWithGoogle() {
  const supabase = createClient(cookies());
  await supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function signInWithFacebook() {
  const supabase = createClient(cookies());
  await supabase.auth.signInWithOAuth({ provider: 'facebook' });
}
