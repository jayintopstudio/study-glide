import { isSupabaseConfigured, supabase, TESTIMONIALS_BUCKET } from '../lib/supabase'

function getTestimonialVideoUrl(videoPath) {
  if (!videoPath) return null

  const trimmed = videoPath.trim()

  // Allow full public URL stored in video_path (paste from Storage dashboard)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  if (!supabase) return null

  let path = trimmed.replace(/^\/+/, '')
  try {
    path = decodeURIComponent(path)
  } catch {
    /* use as-is */
  }

  const { data } = supabase.storage.from(TESTIMONIALS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function fetchPublishedTestimonials() {
  if (!isSupabaseConfigured()) {
    return []
  }

  const { data, error } = await supabase
    .from('testimonials')
    .select('id, name, school, country, video_path')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) throw error

  return (data ?? [])
    .map((row) => ({
      id: row.id,
      name: row.name,
      school: row.school,
      country: row.country,
      videoUrl: getTestimonialVideoUrl(row.video_path),
    }))
    .filter((t) => t.videoUrl)
}
