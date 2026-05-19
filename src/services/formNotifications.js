import { isSupabaseConfigured, supabase } from '../lib/supabase'

/**
 * Email admin + submitter via Edge Function (Zoho SMTP).
 * Called after a successful form insert — errors are logged only.
 *
 * Deploy: supabase functions deploy resend-email
 * URL: https://YOUR_REF.supabase.co/functions/v1/resend-email
 */
const EMAIL_FUNCTION = 'resend-email'

export async function notifyFormSubmission(table, record) {
  if (!isSupabaseConfigured() || !supabase || !record) return

  const { error } = await supabase.functions.invoke(EMAIL_FUNCTION, {
    body: {
      type: 'INSERT',
      table,
      schema: 'public',
      record,
      old_record: null,
    },
  })

  if (error) {
    console.error(`[${EMAIL_FUNCTION}]`, error.message)
  }
}
