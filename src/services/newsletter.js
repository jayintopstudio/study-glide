import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { notifyFormSubmission } from './formNotifications'

function isDuplicateSubscriberError(error) {
  if (!error) return false
  const code = String(error.code ?? '')
  const message = String(error.message ?? '')
  return (
    code === '23505' ||
    error.status === 409 ||
    message.includes('duplicate key') ||
    message.includes('newsletter_subscribers_email_key')
  )
}

/**
 * @returns {'subscribed' | 'already_subscribed'}
 */
export async function subscribeNewsletter(email) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.')
  }

  const normalized = email.trim().toLowerCase()

  const { error } = await supabase.from('newsletter_subscribers').insert({ email: normalized })

  if (isDuplicateSubscriberError(error)) {
    return 'already_subscribed'
  }

  if (error) throw error

  await notifyFormSubmission('newsletter_subscribers', {
    email: normalized,
    subscribed_at: new Date().toISOString(),
  })

  return 'subscribed'
}
