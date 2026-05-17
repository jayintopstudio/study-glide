import { isSupabaseConfigured, supabase } from '../lib/supabase'

export async function subscribeNewsletter(email) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
  }

  const normalized = email.trim().toLowerCase()

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    { email: normalized },
    { onConflict: 'email' },
  )

  if (error) throw error
}
