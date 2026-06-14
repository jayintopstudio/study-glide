import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { notifyFormSubmission } from './formNotifications'

export async function submitContactMessage(form) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.')
  }

  const record = {
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone?.trim() || null,
    message: form.message.trim(),
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('contact_messages').insert(record)

  if (error) throw error

  await notifyFormSubmission('contact_messages', record)
}
