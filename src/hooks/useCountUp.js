import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, duration = 1500) {
  const [v, setV] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let raf
    let start = null

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()

        const tick = (ts) => {
          if (!start) start = ts
          const t = Math.min(1, (ts - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setV(Math.round(target * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    if (ref.current) io.observe(ref.current)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return [v, ref]
}
