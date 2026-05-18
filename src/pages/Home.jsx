import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import PixelButton from '../components/PixelButton'
import OptimizedImage from '../components/OptimizedImage'
import TestimonialVideo from '../components/TestimonialVideo'
import useTestimonials from '../hooks/useTestimonials'
import { countryHeroImages } from '../data/countryHeroImages'
import { getSubmitErrorMessage } from '../lib/formErrors'
import { submitApplication } from '../services/applications'

// ─── Data ────────────────────────────────────────────────────

const universities = [
  { src: 'universities/National%20College%20of%20Ireland.png', alt: 'National College of Ireland' },
  { src: 'universities/Niagara%20College.png', alt: 'Niagara College' },
  { src: 'universities/Robert%20Gordon%20University.png', alt: 'Robert Gordon University' },
  { src: 'universities/Technological%20University%20of%20the%20Shannon.png', alt: 'Technological University of the Shannon' },
  { src: 'universities/University%20of%20Hertfordshire.png', alt: 'University of Hertfordshire' },
  { src: 'universities/University%20of%20Hull.png', alt: 'University of Hull' },
  { src: 'universities/University%20of%20Sunderland.png', alt: 'University of Sunderland' },
  { src: 'universities/University%20of%20Ulster.png', alt: 'University of Ulster' },
  { src: 'universities/University%20of%20Windsor.png', alt: 'University of Windsor' },
  { src: 'universities/Wrexham%20University.png', alt: 'Wrexham University' },
]

const services = [
  { n: '01', title: 'University & Course Selection', body: 'Personalised recommendations tailored to your academic background, career aspirations, and budget.' },
  { n: '02', title: 'Admission Processing & Application Support', body: 'End-to-end assistance with submitting strong, complete applications to your chosen universities.' },
  { n: '03', title: 'Personal Statement & Document Preparation', body: 'Expert help crafting compelling personal statements, CVs, and all required supporting documents.' },
  { n: '04', title: 'Visa Application Assistance', body: 'Professional guidance through the entire visa process to maximise your chances of approval.' },
  { n: '05', title: 'Accommodation Advice', body: 'Practical support in finding safe, comfortable, and suitable student housing options.' },
  { n: '06', title: 'Scholarship & Funding Guidance', body: 'Assistance identifying and applying for scholarships, discounts, and funding opportunities.' },
  { n: '07', title: 'Interview Preparation & Credibility Coaching', body: 'One-on-one coaching to prepare you confidently for university and visa interviews.' },
  { n: '08', title: 'Pre-Departure & Travel Guidance', body: 'Comprehensive briefings to help you prepare for life abroad, travel, and successful settlement.' },
]

/** 12-column mosaic spans (desktop grid only) */
const DEST_GRID_SPANS = ['span-6', 'span-3', 'span-3', 'span-3', 'span-3', 'span-6', 'span-6', 'span-6']

const destinations = [
  { tag: 'UK', img: countryHeroImages.uk, name: 'United Kingdom', desc: 'World-renowned universities, shorter course durations, and excellent post-study work opportunities.',           to: '/destination/uk' },
  { tag: 'CA', img: countryHeroImages.canada, name: 'Canada',         desc: 'High-quality education, welcoming environment, and strong post-graduation work permits.',            to: '/destination/canada' },
  { tag: 'IE', img: countryHeroImages.ireland, name: 'Ireland',        desc: 'Innovative programmes and a supportive European study destination.',               to: '/destination/ireland' },
  { tag: 'AU', img: countryHeroImages.australia, name: 'Australia',      desc: 'Outstanding education system with generous post-study work visas.',                       to: '/destination/australia' },
  { tag: 'US', img: countryHeroImages.usa, name: 'United States',  desc: 'Unparalleled academic flexibility and vast career opportunities.',                    to: '/destination/usa' },
  { tag: 'AE', img: countryHeroImages.dubai, name: 'Dubai',          desc: 'Modern, dynamic education hub with strong industry connections.',                 to: '/destination/dubai' },
  { tag: 'NZ', img: countryHeroImages.newZealand, name: 'New Zealand',    desc: 'Safe, high-quality education in a naturally beautiful setting.',               to: '/destination/new-zealand' },
  { tag: 'EU', img: countryHeroImages.europe, name: 'Europe',         desc: 'Affordable tuition, diverse programmes, and rich cultural experiences.',                 to: '/destination/europe' },
]

function DestCardArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

// ─── Sub-components ──────────────────────────────────────────

function VideoModal({ url, onClose }) {
  if (!url) return null
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true">
      <button
        onClick={onClose}
        className="fixed right-6 top-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-900"
        aria-label="Close video"
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <TestimonialVideo
        src={url}
        className="w-full h-auto max-h-[80vh] md:max-w-4xl mx-auto rounded-3xl shadow-2xl object-contain"
        controls
      />
    </div>
  )
}

// ─── Apply form ──────────────────────────────────────────────

const defaultForm = {
  full_name: '', age: '', phone_number: '', email: '',
  gender: '', preferred_study_destination: 'UK',
  other_countries_interested: '', program_interested: 'Undergraduate',
  intake_period: '2026 intake', highest_qualification: "Bachelor's degree",
  other_qualification: '', previous_visa_refusal: 'No', referral_source: 'A friend',
}

function ApplyForm() {
  const [form, setForm] = useState(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitApplication(form, 'home')
      setSubmitted(true)
    } catch (err) {
      setError(getSubmitErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mt-8 px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#16484b]/10 mb-4">
          <i className="fa-solid fa-check text-2xl text-[#16484b]" />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900">Application Submitted!</h3>
        <p className="mt-2 text-slate-600">We'll be in touch within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 px-4 sm:px-6 lg:px-8">
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-[#414651]">Full Name*</label>
        <input name="full_name" type="text" value={form.full_name} onChange={handleChange} className="form-field" placeholder="Your full name" required />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Age*</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} className="form-field" placeholder="19" required />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Phone Number*</label>
        <input name="phone_number" type="tel" value={form.phone_number} onChange={handleChange} className="form-field" placeholder="+234 800 000 0000" required />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Email*</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="form-field" placeholder="Email" required />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Gender*</label>
        <select name="gender" value={form.gender} onChange={handleChange} className="form-field" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Preferred study destination*</label>
        <select name="preferred_study_destination" value={form.preferred_study_destination} onChange={handleChange} className="form-field" required>
          {['UK','Canada','Ireland','Australia','USA'].map(d => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Other countries interested in*</label>
        <input name="other_countries_interested" type="text" value={form.other_countries_interested} onChange={handleChange} className="form-field" placeholder="Optional" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Program interested in?*</label>
        <select name="program_interested" value={form.program_interested} onChange={handleChange} className="form-field" required>
          {['A Levels','Foundation','Undergraduate','Postgraduate'].map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Intake period*</label>
        <select name="intake_period" value={form.intake_period} onChange={handleChange} className="form-field" required>
          {['2026 intake','2027 intake','Not sure yet'].map(i => <option key={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Highest qualification?*</label>
        <select name="highest_qualification" value={form.highest_qualification} onChange={handleChange} className="form-field" required>
          {['SSCE','OND','HND',"Bachelor's degree"].map(q => <option key={q}>{q}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Other qualification</label>
        <input name="other_qualification" type="text" value={form.other_qualification} onChange={handleChange} className="form-field" placeholder="Optional" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">Any previous visa refusal?*</label>
        <select name="previous_visa_refusal" value={form.previous_visa_refusal} onChange={handleChange} className="form-field" required>
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[#414651]">How did you hear about us?*</label>
        <select name="referral_source" value={form.referral_source} onChange={handleChange} className="form-field" required>
          {['A friend','Instagram','Referral partner','Google search'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {error ? (
        <p className="sm:col-span-2 text-sm text-red-600" role="alert">{error}</p>
      ) : null}
      <div className="sm:col-span-2 pt-3 mx-auto">
        <PixelButton
          as="button"
          type="submit"
          variant="secondary"
          label={submitting ? 'Submitting…' : 'Submit Application'}
          className="min-w-[180px]"
          disabled={submitting}
        />
      </div>
    </form>
  )
}

// ─── Page ────────────────────────────────────────────────────

export default function Home() {
  const [modalUrl, setModalUrl] = useState(null)
  const destScrollRef = useRef(null)
  const testimonialScrollRef = useRef(null)
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonials()

  function scrollDestCarousel(dir) {
    const el = destScrollRef.current
    if (!el) return
    const slide = el.querySelector('[data-dest-slide]')
    const step = (slide?.offsetWidth ?? 280) + 16
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  function scrollTestimonialCarousel(dir) {
    const el = testimonialScrollRef.current
    if (!el) return
    const slide = el.querySelector('[data-testimonial-slide]')
    const step = (slide?.offsetWidth ?? 320) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-20">
          <div className="grid grid-cols-1 items-center gap-12">
            {/* Text */}
            <div className="w-full">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-300/20 bg-accent-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-200">
                <i className="fa-solid fa-star text-[10px]" />
                Visa Processing | Interview Prep | Admissions
              </div>
              <h1 className="font-inter hidden sm:block max-w-[900px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-[-0.02em] text-white md:leading-[1.1] lg:leading-[1.15]">
                Your Global Education{' '} Journey Starts Here.
              </h1>
              <h1 className="font-inter sm:hidden max-w-[900px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-[-0.02em] text-white md:leading-[1.1] lg:leading-[1.15]">
                Guiding Your Path to Global Education. We're a mission-driven company
              </h1>
              <p className="mt-6 font-inter hidden sm:block max-w-lg sm:max-w-xl lg:max-w-2xl text-lg sm:text-xl font-normal leading-7 sm:leading-8 md:leading-relaxed text-white/60">
              Expert guidance for ambitious students who want to study in the UK, USA, Canada, Australia, Ireland, New Zealand, Europe, Dubai, and beyond.
              </p>
              <p className="mt-3 font-inter hidden sm:block max-w-lg sm:max-w-xl lg:max-w-2xl text-lg sm:text-xl font-normal leading-7 sm:leading-8 md:leading-relaxed text-white/60">
              We simplify the entire international admission process, from university selection and applications to visas and pre-departure support, so you can focus on building a successful future.
              </p>
              <p className="mt-3 font-inter sm:hidden max-w-lg sm:max-w-xl lg:max-w-2xl text-lg sm:text-xl font-normal leading-7 sm:leading-8 md:leading-relaxed text-white/60">
              We simplify the entire international admission process, from university selection and applications to visas and pre-departure support, so you can focus on building a successful future.At StudyGlide, we believe education is the most powerful tool for global opportunity. Our mission is to bridge the gap between talented students and world-class institutions through personalized, transparent, and ethical consulting.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <PixelButton
                  variant="primary"
                  label="Explore Destination"
                  to="/destination"
                  // className="w-full sm:w-1/2"
                />
                <PixelButton
                  variant="outline"
                  label="Get in touch"
                  to="/contact"
                />
              </div>
            </div>

            {/* Hero image */}
            <div className="relative overflow-hidden shadow-card">
              <OptimizedImage
                src="/home-page-hero.png"
                alt="Smiling international student in a hallway"
                priority
                className="h-80 sm:h-[450px] md:h-[500px] lg:h-[540px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* White corner clip */}
        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── University logo marquee ── */}
      <div className="shell">
        <section className="py-16 md:py-20">
          <div className="text-center">
            <p className="font-medium text-[#535862]">
            Trusted by 4,000+ Universities
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-6 sm:hidden">
            {universities.map(u => (
              <OptimizedImage key={u.alt} src={u.src} alt={u.alt} className="logo-image max-h-12 w-auto object-contain" />
            ))}
          </div>
          <div className="logo-marquee mt-8 hidden sm:block">
            <div className="logo-marquee-track">
              {/* Group 1 */}
              <div className="logo-marquee-group">
                {universities.map(u => (
                  <OptimizedImage key={u.alt} src={u.src} alt={u.alt} className="logo-image" />
                ))}
              </div>
              {/* Group 2 — duplicate for seamless loop */}
              <div className="logo-marquee-group" aria-hidden="true">
                {universities.map(u => (
                  <OptimizedImage key={u.alt + '-dup'} src={u.src} decorative className="logo-image" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="svc-section py-12 sm:py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between py-6 min-w-0">
            <div className="min-w-0">
              <p className="eyebrow font-semibold! leading-6!">Our Expertise</p>
              <h2 className="section-title mt-4">Comprehensive Services</h2>
            </div>
            <PixelButton
              variant="gold"
              label="View All Services"
              to="/services"
              className="w-full sm:w-auto min-w-0 sm:min-w-[180px] shrink-0"
            />
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <Link key={s.n} to="/services" className="svc-card">
                <div className="svc-num">{s.n}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.body}</p>
                <span className="svc-arrow">
                  Learn more
                  <i className="fa-solid fa-arrow-right text-[0.75rem]" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Destinations ── */}
        <section id="destinations" className="py-16 sm:py-20 md:py-24 lg:py-28 min-w-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between py-6 min-w-0">
            <div className="min-w-0">
            <h2 className="section-title">Top Study Destinations</h2>
              <p className="tracking-[0%] uppercase text-[#535862] mt-4 text-lg md:text-xl">Global Reach</p>
            </div>
            <PixelButton
              variant="ghost"
              label="View All Destinations"
              to="/destination"
              className="w-full sm:w-auto min-w-0 sm:min-w-[180px] shrink-0"
            />
          </div>

          {/* Desktop: mosaic grid */}
          <div className="dest-grid hidden lg:grid">
            {destinations.map((d, i) => (
              <Link
                key={d.name}
                to={d.to}
                className={`dest-card ${DEST_GRID_SPANS[i]}`}
              >
                <OptimizedImage src={d.img} alt="" decorative className="dest-card__media" />
                <span className="dest-card__tag">{d.tag}</span>
                <span className="dest-card__arrow">
                  <DestCardArrow />
                </span>
                <div className="dest-card__meta">
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile / tablet: horizontal carousel */}
          {/* <div className="lg:hidden min-w-0">
            <div
              ref={destScrollRef}
              className="carousel-scroll flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory touch-pan-x [scrollbar-width:thin]"
            >
              {destinations.map(d => (
                <Link
                  key={d.name}
                  to={d.to}
                  data-dest-slide
                  className="group destination-card w-[min(85vw,20rem)] shrink-0 snap-center"
                >
                  <OptimizedImage src={d.img} alt={d.name} className="destination-card-image object-[52%_center]" />
                  <div className="destination-card-content">
                    <h3 className="font-display text-[2rem] leading-tight">{d.name}</h3>
                    <p className="text-sm leading-6 text-white/80">{d.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="testimonial-nav justify-start">
              <button type="button" onClick={() => scrollDestCarousel(-1)} className="nav-btn-prev" aria-label="Previous destinations">
                <i className="fa-solid fa-arrow-left" />
              </button>
              <button type="button" onClick={() => scrollDestCarousel(1)} className="nav-btn-next" aria-label="Next destinations">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div> */}
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonial" className="py-16 sm:py-20 md:py-24 lg:py-28 min-w-0">
          <h2 className="font-display text-2xl sm:text-[36px] font-semibold text-slate-900">
            We&apos;re proud of our success stories
          </h2>
          <p className="mt-3 sm:text-xl tracking-[-2%] text-[#535862]">Hear from some of our amazing students we have helped.</p>

          <div className="mt-10 min-w-0">
            {testimonialsLoading ? (
              <p className="text-[#535862]">Loading success stories…</p>
            ) : testimonialsError ? (
              <p className="text-[#535862]">Unable to load testimonials right now.</p>
            ) : testimonials.length === 0 ? (
              <p className="text-[#535862]">Success stories coming soon.</p>
            ) : (
            <>
            <div
              ref={testimonialScrollRef}
              className="carousel-scroll flex gap-6 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory touch-pan-x [scrollbar-width:thin]"
            >
            {testimonials.map((t) => (
              <article
                key={t.id}
                data-testimonial-slide
                className="group relative h-[480px] w-[min(85vw,22rem)] shrink-0 snap-center overflow-hidden bg-slate-900 cursor-pointer shadow-lg ring-1 ring-white/10 sm:w-[min(85vw,26rem)]"
                onClick={() => setModalUrl(t.videoUrl)}
              >
                <TestimonialVideo
                  src={t.videoUrl}
                  className="absolute inset-0 h-full w-full object-cover"
                  preview
                />
                {/* Soft veil — transparent toward top, readable at bottom */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" aria-hidden />
                {/* Play button — always visible on mobile; hover-only on md+ */}
                <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-xl">
                    <i className="fa-solid fa-play text-black/35" />
                  </div>
                </div>
                {/* Glass strip over video */}
                <div className="absolute bottom-0 inset-x-0 h-[170px] flex flex-col p-6 bg-white/10 backdrop-blur-md group-hover:opacity-0 transition-opacity duration-200">
                  <div className="flex gap-0.5 text-white text-xl mb-1">
                    {[...Array(5)].map((_, s) => <i key={s} className="fa-solid fa-star" />)}
                  </div>
                  <p className="font-semibold text-white text-2xl mt-4 mb-2">{t.name}</p>
                  <p className="text-white font-semibold">{t.school}</p>
                  <p className="text-white text-sm mt-0.5">{t.country}</p>
                </div>
              </article>
            ))}
            </div>
            <div className="testimonial-nav justify-start">
              <button type="button" onClick={() => scrollTestimonialCarousel(-1)} className="nav-btn-prev" aria-label="Previous testimonials">
                <i className="fa-solid fa-arrow-left" />
              </button>
              <button type="button" onClick={() => scrollTestimonialCarousel(1)} className="nav-btn-next" aria-label="Next testimonials">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
            </>
            )}
          </div>
        </section>

        {/* ── Apply form ── */}
        <section id="apply" className="shell py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            {/* Left — image */}
            <div className="relative overflow-hidden w-full h-64 sm:h-80 md:h-96 lg:min-h-[786px] my-16">
              <OptimizedImage
                src="/Image(12).png"
                alt="Prospective student holding books"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
            </div>
            {/* Right — form */}
            <div className="max-w-xl">
              <h2 className="section-title px-4 sm:px-6 lg:px-8">Start your study abroad journey here</h2>
              <p className="mt-4 hidden sm:block font-body font-normal text-lg sm:text-xl leading-[1.75] text-[#535862] px-4 sm:px-6 lg:px-8">
              Fill the application form below and one of our senior consultants will contact you within 24 hours.
              </p>
              <p className="mt-4 sm:hidden font-body font-normal text-lg sm:text-xl leading-[1.75] text-[#535862] px-4 sm:px-6 lg:px-8">
              Fill the application form below
              </p>
              <ApplyForm />
            </div>
          </div>
        </section>
      </div>

      {/* ── Video modal ── */}
      <VideoModal url={modalUrl} onClose={() => setModalUrl(null)} />
    </Layout>
  )
}
