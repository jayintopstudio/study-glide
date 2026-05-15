import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_COLS = 6
const DEFAULT_ROWS = 2

function ArrowIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function usePixelGrid(btnRef, gridRef, cols, rows) {
  useEffect(() => {
    const btn = btnRef.current
    const grid = gridRef.current
    if (!btn || !grid) return

    const cells = []
    grid.innerHTML = ''
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div')
        cell.className = 'pxbtn-cell'
        grid.appendChild(cell)
        cells.push({ el: cell, col: c, row: r })
      }
    }

    const timers = []
    function clearTimers() {
      timers.forEach(clearTimeout)
      timers.length = 0
    }

    function getCell(e) {
      const rect = btn.getBoundingClientRect()
      const col = Math.floor(((e.clientX - rect.left) / rect.width) * cols)
      const row = Math.floor(((e.clientY - rect.top) / rect.height) * rows)
      return {
        col: Math.max(0, Math.min(cols - 1, col)),
        row: Math.max(0, Math.min(rows - 1, row)),
      }
    }

    function rippleIn(originCol, originRow) {
      clearTimers()
      const sorted = [...cells].sort((a, b) => {
        const da = Math.sqrt((a.col - originCol) ** 2 + (a.row - originRow) ** 2)
        const db = Math.sqrt((b.col - originCol) ** 2 + (b.row - originRow) ** 2)
        return da + Math.random() * 0.8 - (db + Math.random() * 0.8)
      })
      sorted.forEach((item, i) => {
        timers.push(setTimeout(() => item.el.classList.add('on'), i * 45))
      })
    }

    function rippleOut() {
      clearTimers()
      const shuffled = [...cells].sort(() => Math.random() - 0.5)
      shuffled.forEach((item) => {
        const delay = Math.random() * 600
        timers.push(setTimeout(() => item.el.classList.remove('on'), delay))
      })
    }

    function onEnter(e) {
      const { col, row } = getCell(e)
      rippleIn(col, row)
    }
    function onLeave() {
      rippleOut()
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      clearTimers()
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [btnRef, gridRef, cols, rows])
}

/**
 * Pixel-grid ripple + sliding arrow. Variants mirror existing site button styles.
 *
 * primary | outline     — hero CTAs
 * ghost   | ghost-lg    — transparent + teal border (light sections)
 * gold    | gold-mobile — filled gold
 * secondary | secondary-applicants | secondary-lg — filled teal
 */
export default function PixelButton({
  label,
  to,
  href,
  variant = 'primary',
  className = '',
  labelClassName = '',
  type = 'submit',
  as,
  onClick,
  cols = DEFAULT_COLS,
  rows = DEFAULT_ROWS,
}) {
  const btnRef = useRef(null)
  const gridRef = useRef(null)
  usePixelGrid(btnRef, gridRef, cols, rows)

  const isButton = as === 'button' || (!to && !href && as !== 'link')
  const variantClass =
    variant === 'secondary-applicants'
      ? 'pxbtn--secondary pxbtn--secondary-applicants'
      : `pxbtn--${variant}`
  const rootClass = ['pxbtn w-full! sm:max-w-[242px]!', variantClass, className].filter(Boolean).join(' ')
  const labelClass = ['pxbtn-label w-full! sm:max-w-[242px]!', labelClassName].filter(Boolean).join(' ')

  const inner = (
    <>
      <div
        ref={gridRef}
        className="pxbtn-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      />
      <span className={labelClass}>{label}</span>
      <span className="pxbtn-arrow-box">
        <span className="pxbtn-arrow pxbtn-arrow-out">
          <ArrowIcon />
        </span>
        <span className="pxbtn-arrow pxbtn-arrow-in">
          <ArrowIcon />
        </span>
      </span>
    </>
  )

  if (isButton) {
    return (
      <button ref={btnRef} type={type} className={rootClass} onClick={onClick}>
        {inner}
      </button>
    )
  }

  if (to) {
    return (
      <Link ref={btnRef} to={to} className={rootClass} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      ref={btnRef}
      href={href}
      className={rootClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  )
}
