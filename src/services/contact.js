import { isSupabaseConfigured, supabase } from '../lib/supabase'

export async function submitContactMessage(form) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
  }

  const { error } = await supabase.from('contact_messages').insert({
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone?.trim() || null,
    message: form.message.trim(),
  })

  if (error) throw error
}
