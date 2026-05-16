import { useState } from 'react'
import { Link } from 'react-router-dom'
import OptimizedImage from './OptimizedImage'
import PixelButton from './PixelButton'

const FOOTER_LOGO = '/footer-logo.png'

const quickLinks = [
  { to: '/about',    label: 'About Us' },
  { to: '/contact',  label: 'Contact Us' },
  { to: '/faq',      label: 'FAQ' },
  { to: '/services', label: 'Scholarships' },
]

const socials = [
  { href: 'https://www.tiktok.com/@studyglide_edu?_r=1&_t=ZS-95OCqk0Sirk', icon: 'fa-brands fa-tiktok',     label: 'TikTok' },
  { href: 'https://twitter.com/studyglide_edu',                              icon: 'fa-brands fa-x-twitter',  label: 'X' },
  { href: 'https://www.instagram.com/studyglide_edu',                        icon: 'fa-brands fa-instagram',  label: 'Instagram' },
  { href: 'https://www.facebook.com/share/18DvbTwACB/',                      icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    // Wire this up to your backend / email service as needed
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden bg-brand-800 text-white">
      {/* Top-right white triangle clip */}
      <div className="pointer-events-none absolute -top-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_100%,0_0,100%_0)]" />

      <div className="shell py-16">
        {/* ── Main grid ── */}
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-[1fr_0.85fr_0.8fr_1.35fr]">

          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <OptimizedImage src={FOOTER_LOGO} alt="StudyGlide logo" className="w-full max-w-[160px]" />
            </Link>
            <p className="mt-6 max-w-sm contact-text text-[#94A3B8]!">
              Nigeria&apos;s most trusted education consultancy, bridging the gap between local talent and global opportunities.
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div className='sm:block hidden'>
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Office Address</span><br />
                Shop 1MS FAAN complex beside FAAN staff quarters, Ikeja along Lagos State
              </p>
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Phone</span><br />
                +234 913 307 1334
              </p>
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Email</span><br />
                Info@studyglidedu.com
              </p>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className='sm:block hidden'>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="mt-5 space-y-3">
              {quickLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="quick-link-text block">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="font-semibold text-lg">Stay up to date</h3>
            <p className="mt-5 max-w-[48ch] contact-text text-[#94979C]!">
            Design amazing digital experiences that create more happy in the world.
            </p>

            {submitted ? (
              <p className="mt-5 text-[#E2C065] font-semibold text-sm">
                ✓ Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="footer-subscribe-input min-h-11 form-field min-w-0 flex-1 border-white/15 bg-white text-slate-900 sm:min-w-[220px]"
                />
                <PixelButton
                  as="button"
                  type="submit"
                  variant="gold"
                  label="Subscribe"
                  className="rounded-[5px] px-3 pxbtn--arrow-lg"
                />
              </form>
            )}
          </div>

          <div className='sm:hidden flex gap-2'>
            {/* Column 2 — Contact */}
          <div className='w-1/2'>
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Office Address</span><br />
                Shop 1MS FAAN complex beside FAAN staff quarters, Ikeja along Lagos State
              </p>
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Phone</span><br />
                +234 913 307 1334
              </p>
              <p className="contact-text text-[#94979C]!">
                <span className="text-[#E2C065] font-display">Email</span><br />
                Info@studyglidedu.com
              </p>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className='w-1/2'>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="mt-5 space-y-3">
              {quickLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="quick-link-text block">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-4 pt-6 text-sm text-[#94979C] md:flex-row md:items-center md:justify-between">
          <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} StudyGlide. All rights reserved.</p>

          {/* Social icons */}
          <div className="order-1 flex items-center gap-5 text-base md:order-2">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition hover:text-[#E2C065]"
              >
                <i className={icon} />
              </a>
            ))}
          </div>

          <p className="order-3">
            Design by{' '}
            <a href="https://jayintopstudio.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              JayintopStudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
