export function getSubmitErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.'

  if (
    error.code === '23505' ||
    error.status === 409 ||
    String(error.message ?? '').includes('duplicate key')
  ) {
    return 'This email is already subscribed.'
  }

  if (error.message?.includes('Supabase is not configured')) {
    return 'Form service is temporarily unavailable. Please email us directly.'
  }

  return error.message || 'Something went wrong. Please try again.'
}
