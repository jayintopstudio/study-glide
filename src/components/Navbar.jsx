'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import OptimizedImage from './OptimizedImage'
import PixelButton from './PixelButton'

const LOGO = '/logo.png'

const navLinks = [
  { href: '/', label: 'HOME', menuLabel: 'Home' },
  { href: '/about', label: 'ABOUT US', menuLabel: 'About Us' },
  { href: '/services', label: 'SERVICES', menuLabel: 'Services' },
  { href: '/destination', label: 'DESTINATION', menuLabel: 'Destination' },
  { href: '/faq', label: 'FAQ', menuLabel: 'FAQ' },
]

function isActive(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const close = () => {
      if (mq.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <header className="relative z-[9999] bg-brand-800">
      <div className="shell py-3 sm:py-4 lg:py-6">
        <nav className="flex-none lg:flex items-center justify-between gap-4">

          <Link href="/" className="hidden lg:flex shrink-0 items-center">
            <OptimizedImage src={LOGO} alt="StudyGlide logo" priority className="h-10 w-auto md:h-11" />
          </Link>

          <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map(({ href, label }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link anchor-nav font-mono font-normal text-[14px] leading-[14px] tracking-[0%] align-middle uppercase border-b-2 pb-4 transition-colors${active ? ' border-[#E2C065] text-[#E2C065]' : ' border-transparent'}`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center justify-between gap-3">
            <PixelButton
              href="/contact"
              variant="gold"
              label="Get In Touch"
              labelClassName="!pl-0 text-base font-semibold leading-6 mr-10"
              className="hidden! sm:inline-flex!"
            />

            <Link href="/" className="flex shrink-0 items-center lg:hidden">
              <OptimizedImage src={LOGO} alt="StudyGlide logo" className="h-10 w-auto" />
            </Link>

            <button
              className="relative flex items-center justify-center h-11 w-11 text-white cursor-pointer lg:hidden"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <i
                className={`fa-solid fa-bars absolute transition-all duration-300 ${
                  mobileOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              <i
                className={`fa-solid fa-xmark absolute transition-all duration-300 ${
                  mobileOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-[10000] flex h-fit flex-col bg-brand-800 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex shrink-0 items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
            <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
              <OptimizedImage src={LOGO} alt="StudyGlide logo" className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-xl text-white transition hover:text-[#E2C065]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <nav className="min-h-0 overflow-y-auto px-5 py-8">
            <div className="flex flex-col gap-8">
              {navLinks.map(({ href, label, menuLabel }) => {
                const active = isActive(pathname, href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block font-inter font-semibold tracking-tight transition-colors hover:text-[#E2C065] ${active ? 'text-[#E2C065]' : 'text-white'}`}
                  >
                    {menuLabel ?? label}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
            <PixelButton
              href="/contact"
              variant="gold-mobile"
              label="Get in Touch"
              labelClassName="!pl-0"
              className="sm:max-w-full!"
              onClick={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  )
}
