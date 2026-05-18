import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import OptimizedImage from '../components/OptimizedImage'
import { countryHeroImages } from '../data/countryHeroImages'

// ─── Data ────────────────────────────────────────────────────

const DEST_GRID_SPANS = ['span-6', 'span-3', 'span-3', 'span-3', 'span-3', 'span-6', 'span-6', 'span-6']

const destinations = [
  {
    tag: 'UK',
    name: 'United Kingdom',
    desc: 'World-renowned education with excellent post-study work options.',
    img: countryHeroImages.uk,
    to: '/destination/uk',
  },
  {
    tag: 'CA',
    name: 'Canada',
    desc: 'Welcoming society and strong post-graduation opportunities.',
    img: countryHeroImages.canada,
    to: '/destination/canada',
  },
  {
    tag: 'IE',
    name: 'Ireland',
    desc: 'Innovative programmes and a supportive European study destination.',
    img: countryHeroImages.ireland,
    to: '/destination/ireland',
  },
  {
    tag: 'AU',
    name: 'Australia',
    desc: 'Outstanding education and quality of life.',
    img: countryHeroImages.australia,
    to: '/destination/australia',
  },
  {
    tag: 'US',
    name: 'United States',
    desc: 'Academic flexibility and global career advantages.',
    img: countryHeroImages.usa,
    to: '/destination/usa',
  },
  {
    tag: 'AE',
    name: 'Dubai',
    desc: 'Modern, dynamic, and industry-focused education hub.',
    img: countryHeroImages.dubai,
    to: '/destination/dubai',
  },
  {
    tag: 'NZ',
    name: 'New Zealand',
    desc: 'Safe, high-quality education in a beautiful environment.',
    img: countryHeroImages.newZealand,
    to: '/destination/new-zealand',
  },
  {
    tag: 'EU',
    name: 'Europe',
    desc: 'Affordable, diverse, and culturally rich study options.',
    img: countryHeroImages.europe,
    to: '/destination/europe',
  },
]

function DestCardArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function truncateDesc(text, max = 100) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

// ─── Page ────────────────────────────────────────────────────

export default function Destination() {
  const [query, setQuery] = useState('')

  const filtered = destinations.filter((d) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      d.name.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q)
    )
  })

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">

            <div className="w-full">
              <div className="hero-breadcrumb capitalize! font-semibold!">Destination</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="order-1 col-span-7">
                <h1 className="hero-title text-[32px]! md:text-[40px]! lg:text-[48px]! font-medium! tracking-[-2%] max-w-[632px] leading-[44px]! md:leading-[60px]!">Where would you like to study?</h1>
              </div>
              <div className="order-2 col-span-5">
                <p className="hero-paragraph text-base! lg:text-[20px]! leading-7.5">
                  At StudyGlide Educational Consult, we are committed to helping students worldwide achieve their dreams of studying abroad through professional, transparent, and result-oriented services.Explore top study destinations with strong partnerships and proven success for international students.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Search + destination mosaic grid ── */}
      <main>
        <div className="shell py-16 sm:py-20 md:py-24 min-w-0 overflow-x-clip">
          <div className="dest-search-wrap">
            <span className="dest-search-icon" aria-hidden>
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="search"
              className="dest-search"
              placeholder="Filter destinations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter destinations"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="dest-search-empty text-center text-[#535862]">
              No destinations match &ldquo;{query}&rdquo;. Try another search.
            </p>
          ) : (
            <div className="dest-grid dest-grid--page">
              {filtered.map((d, i) => (
                <Link
                  key={d.to}
                  to={d.to}
                  className={`dest-card ${DEST_GRID_SPANS[i % DEST_GRID_SPANS.length]}`}
                >
                  <OptimizedImage src={d.img} alt="" decorative className="dest-card__media" />
                  <span className="dest-card__tag">{d.tag}</span>
                  <span className="dest-card__arrow">
                    <DestCardArrow />
                  </span>
                  <div className="dest-card__meta">
                    <h3>{d.name}</h3>
                    <p>{truncateDesc(d.desc)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

    </Layout>
  )
}
