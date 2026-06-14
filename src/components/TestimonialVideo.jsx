'use client'

import { useEffect, useRef } from 'react'

/**
 * Embeds a public Supabase Storage MP4. Uses src directly on <video> (more reliable
 * than <source> alone). Blob fallback only if the element still errors.
 */
export default function TestimonialVideo({
  src,
  className = '',
  preview = false,
  controls = false,
  autoPlay = false,
}) {
  const videoRef = useRef(null)
  const blobUrlRef = useRef(null)
  const retriedRef = useRef(false)

  useEffect(() => {
    retriedRef.current = false
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
    const el = videoRef.current
    if (el && src) {
      el.src = src
      el.load()
    }
  }, [src])

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
    }
  }, [])

  async function handleError() {
    if (!src || retriedRef.current || !videoRef.current) return
    retriedRef.current = true

    try {
      const res = await fetch(src)
      if (!res.ok) return

      const blob = new Blob([await res.arrayBuffer()], { type: 'video/mp4' })
      blobUrlRef.current = URL.createObjectURL(blob)
      videoRef.current.src = blobUrlRef.current
      videoRef.current.load()
      if (autoPlay) {
        videoRef.current.play().catch(() => {})
      }
    } catch {
      /* ignore */
    }
  }

  if (!src) return null

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted={preview || !controls}
      playsInline
      controls={controls}
      autoPlay={autoPlay}
      loop={autoPlay}
      preload={preview ? 'metadata' : 'auto'}
      onError={handleError}
    />
  )
}
