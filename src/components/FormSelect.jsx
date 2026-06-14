'use client'

import { useState } from 'react'

function SelectChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Native select with hidden system chevron and animated custom indicator.
 */
export default function FormSelect({ className = '', children, onFocus, onBlur, ...props }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`form-select-wrap${open ? ' is-open' : ''}`}>
      <select
        {...props}
        className={`form-field form-field--select${className ? ` ${className}` : ''}`}
        onFocus={(e) => {
          setOpen(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setOpen(false)
          onBlur?.(e)
        }}
      >
        {children}
      </select>
      <span className="form-select-chevron" aria-hidden>
        <SelectChevron />
      </span>
    </div>
  )
}
