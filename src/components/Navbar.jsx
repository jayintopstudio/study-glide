import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link } from 'react-router-dom'
import OptimizedImage from './OptimizedImage'
import PixelButton from './PixelButton'

const LOGO = '/logo.png'

const navLinks = [
  { to: '/', label: 'HOME', menuLabel: 'Home' },
  { to: '/about', label: 'ABOUT US', menuLabel: 'About Us' },
  { to: '/services', label: 'SERVICES', menuLabel: 'Services' },
  { to: '/destination', label: 'DESTINATION', menuLabel: 'Destination' },
  { to: '/faq', label: 'FAQ', menuLabel: 'FAQ' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const scrollY = window.scrollY
    const { style: htmlStyle } = document.documentElement
    const { style: bodyStyle } = document.body
    const prevHtmlOverflow = htmlStyle.overflow
    const prevBodyOverflow = bodyStyle.overflow
    const prevBodyPosition = bodyStyle.position
    const prevBodyTop = bodyStyle.top
    const prevBodyWidth = bodyStyle.width

    document.documentElement.classList.add('menu-open')
    htmlStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'

    return () => {
      document.documentElement.classList.remove('menu-open')
      htmlStyle.overflow = prevHtmlOverflow
      bodyStyle.overflow = prevBodyOverflow
      bodyStyle.position = prevBodyPosition
      bodyStyle.top = prevBodyTop
      bodyStyle.width = prevBodyWidth
      window.scrollTo(0, scrollY)
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
      {/* Grid pattern overlay */}
      {/* <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" /> */}

      <div className="shell py-3 sm:py-4 lg:py-6">
        <nav className="flex-none lg:flex items-center justify-between gap-4">

          {/* ── Desktop logo ── */}
          <Link to="/" className="hidden lg:flex shrink-0 items-center">
            <OptimizedImage src={LOGO} alt="StudyGlide logo" priority className="h-10 w-auto md:h-11" />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link anchor-nav font-mono font-normal text-[14px] leading-[14px] tracking-[0%] align-middle uppercase border-b-2 pb-4 transition-colors${isActive ? ' border-[#E2C065] text-[#E2C065]' : ' border-transparent'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Right side: CTA + mobile logo + hamburger ── */}
          <div className="flex items-center justify-between gap-3">

            {/* Desktop CTA button */}
            <PixelButton
              to="/contact"
              variant="gold"
              label="Get In Touch"
              labelClassName="!pl-0 text-base font-semibold leading-6 mr-10"
              className="hidden! sm:inline-flex!"
            />

            {/* Mobile logo (centred) */}
            <Link to="/" className="flex shrink-0 items-center lg:hidden">
              <OptimizedImage src={LOGO} alt="StudyGlide logo" className="h-10 w-auto" />
            </Link>

            {/* Hamburger button (mobile only) */}
            <button
              className="relative flex items-center justify-center h-11 w-11 text-white cursor-pointer lg:hidden"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {/* Bars icon */}
              <i
                className={`fa-solid fa-bars absolute transition-all duration-300 ${
                  mobileOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              {/* X icon */}
              <i
                className={`fa-solid fa-xmark absolute transition-all duration-300 ${
                  mobileOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Portal + full viewport height — avoids iOS clipping behind hero (h-fit bug) */}
      {mobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-brand-900 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
              <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
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

            <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-10 [-webkit-overflow-scrolling:touch]">
              <div className="flex flex-col gap-6">
                {navLinks.map(({ to, label, menuLabel }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block font-inter text-2xl font-semibold tracking-tight transition-colors hover:text-accent-300 ${isActive ? 'text-accent-300' : 'text-white'}`
                    }
                  >
                    {menuLabel ?? label}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="shrink-0 border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <PixelButton
                to="/contact"
                variant="gold-mobile"
                label="Get in Touch"
                labelClassName="!pl-0"
                className="sm:max-w-full!"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}
