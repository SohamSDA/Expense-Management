import { supabaseAdmin } from './supabase-admin';

export async function syncUserToSupabase(clerkUserId) {
  const { error } = await supabaseAdmin
    .from('users')
    .upsert({ clerk_user_id: clerkUserId }, { onConflict: 'clerk_user_id' }); // ✅ THIS FIXES IT

  if (error) {
    console.error('❌ Failed to sync user to Supabase:', error.message);
  }
}
