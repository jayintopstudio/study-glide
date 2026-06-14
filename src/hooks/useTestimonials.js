'use client'

import { useEffect, useState } from 'react'
import { fetchPublishedTestimonials } from '../services/testimonials'

export default function useTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchPublishedTestimonials()
      .then((rows) => {
        if (!cancelled) setTestimonials(rows)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { testimonials, loading, error }
}
