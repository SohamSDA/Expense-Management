import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function createServerSupabaseClient() {
    console.log("Calling getToken...");

  const { getToken } = await auth(); // ✅ await this!
  const token = await getToken({ template: 'supabase' }); // ✅ token retrieved properly
  console.log("TOKEN:", token);

  if (!token) {
    throw new Error('Token is null — check your Clerk JWT template name or session');
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  return supabase;
}
