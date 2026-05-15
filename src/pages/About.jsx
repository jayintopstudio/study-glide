import Layout from '../components/Layout'
import PixelButton from '../components/PixelButton'

// ─── Data ────────────────────────────────────────────────────

const stats = [
  { value: '10+',  label: 'Years Experience' },
  { value: '98%',  label: 'Visa Success Rate' },
  { value: '100+', label: 'Students Placed' },
]

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

const features = [
  {
    n: 1,
    title: 'Global Network',
    body: 'We maintain strong, direct partnerships with top-ranked universities and pathway providers across the UK, Canada, USA, Australia, Ireland, New Zealand, Dubai, and Europe. This gives you access to exclusive opportunities and faster application processing.',
  },
  {
    n: 2,
    title: 'Personalized University and Course Selection',
    body: "We don't offer generic lists. Every recommendation is carefully matched to your academic background, career goals, financial situation, and personal preferences — ensuring you only apply to institutions where you have a strong chance of success.",
  },
  {
    n: 3,
    title: 'End-to-End Support',
    body: 'From the moment you contact us until you arrive on campus, we provide complete assistance. This includes university applications, personal statement writing, visa processing, accommodation search, and pre-departure guidance — all under one roof.',
  },
  {
    n: 4,
    title: 'Proven Track Record',
    body: 'With over 10 years of experience and a 98% visa success rate, we have successfully helped more than 100 students secure admissions into reputable universities worldwide. Our results speak for themselves.',
  },
  {
    n: 5,
    title: 'Expert Visa and Interview Guidance',
    body: 'Visa refusal is one of the biggest fears for international students. Our team provides detailed documentation support, credibility interview coaching, and personalised strategies that significantly increase your approval chances.',
  },
  {
    n: 6,
    title: 'Scholarship and Funding Support',
    body: 'We actively guide you toward scholarships, tuition discounts, and flexible payment options to make studying abroad more affordable. Many of our students secure partial or full funding through our assistance.',
  },
  {
    n: 7,
    title: 'Transparency and Integrity',
    body: 'We believe in honest communication. You will always receive clear timelines, realistic expectations, and transparent pricing with no hidden charges. Your success and peace of mind are our top priorities.',
  },
  {
    n: 8,
    title: 'Pre-Departure and Settlement Guidance',
    body: "We don't stop at visa approval. Our comprehensive pre-departure briefings cover travel arrangements, cultural adaptation, banking setup, health insurance, accommodation, and everything you need to settle confidently in your new country.",
  },
]

// ─── Page ────────────────────────────────────────────────────

export default function About() {
  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">
            {/* Breadcrumb */}
            <div className="w-full">
              <div className="hero-breadcrumb capitalize! font-semibold!">About Us</div>
            </div>

            {/* Title + subtitle */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="order-1 col-span-7">
                <h1 className="hero-title text-[32px]! md:text-[40px]! lg:text-[48px]! font-medium! tracking-[-2%] max-w-[632px] leading-[44px]! md:leading-[60px]!">Guiding Your Path to Global Education</h1>
              </div>
              <div className="order-2 col-span-5">
                <p className="hero-paragraph text-base! md:text-[20px]! leading-7.5!">
                  StudyGlide is more than a consultancy; we are your strategic partner in navigating the complexities of international admissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* White corner clip */}
        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Main content ── */}
      <main>
        <div>

          {/* ── Stats strip ── */}
          <section id="stats" className="py-16 md:py-24 shell">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 py-10 px-6 md:p-14 bg-[#FAFAFA] rounded-[16px]">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <h3 className="about-stats-number text-5xl! font-semibold! md:text-[60px]!">{s.value}</h3>
                  <p className="about-stats-paragraph mt-3!">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Our Story ── */}
          <section id="our-story" className="py-16 md:py-24 shell">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
              {/* Text */}
              <div className="lg:flex lg:items-center lg:justify-center lg:p-12">
                <div className="max-w-full">
                  <small className="about-story-eyebrow-insight font-semibold! capitalize! leading-6">Our story</small>
                  <h2 className="about-story-eyebrow-title text-[30px] md:text-[36px] font-semibold! tracking-[-0.02em]">We&apos;re more than just getting started</h2>
                  <p className="about-story-eyebrow-paragraph leading-7!">
                  At StudyGlide Educational Consult, we believe education is the most powerful tool for global opportunity. Our mission is to bridge the gap between ambitious students and world-class institutions across the United Kingdom, Canada, United States, Australia, Ireland, Europe, and beyond.
                  </p>
                  <p className="about-story-eyebrow-paragraph leading-7!">
                  We provide personalised, transparent, and reliable services tailored to each student’s academic background, career aspirations, and financial situation.
                  </p>
                </div>
              </div>
              {/* Image */}
              <div className="lg:h-[654px]">
                <img
                  src="about-us/Image(11).png"
                  alt="About us"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* ── University marquee ── */}
          <section id="marquee" className="py-16 px-16 md:px-25 md:py-24 bg-[#FAFAFA]">
          <div className="text-center">
            <p className="font-medium text-[#535862]">
            Trusted by 4,000+ Universities
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-6 sm:hidden">
            {universities.map(u => (
              <img key={u.alt} src={u.src} alt={u.alt} className="logo-image max-h-12 w-auto object-contain" />
            ))}
          </div>
          <div className="logo-marquee mt-8 hidden sm:block">
            <div className="logo-marquee-track">
              {/* Group 1 */}
              <div className="logo-marquee-group">
                {universities.map(u => (
                  <img key={u.alt} src={u.src} alt={u.alt} className="logo-image" />
                ))}
              </div>
              {/* Group 2 — duplicate for seamless loop */}
              <div className="logo-marquee-group" aria-hidden="true">
                {universities.map(u => (
                  <img key={u.alt + '-dup'} src={u.src} alt="" className="logo-image" />
                ))}
              </div>
            </div>
          </div>
          </section>
          

          {/* ── Why Choose StudyGlide ── */}
          <section id="features" className="py-12 sm:py-16 md:py-24 shell">
            <h2 className="about-guide-main-title text-center font-semibold! tracking-[-0.02em]">Why Choose StudyGlide?</h2>
            <p className="about-guide-main-paragraph text-center mx-auto">
              At StudyGlide Educational Consult, we go beyond simply processing applications. We become your dedicated partner throughout your entire study abroad journey. Here&apos;s why thousands of students trust us:
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {features.map(f => (
                <div key={f.n} className="w-full bg-[#FAFAFA] p-4 lg:p-8">
                  <span className="icon-circle about-guide-icon mb-16">0{f.n}</span>
                  <h3 className="about-guide-title">{f.title}</h3>
                  <p className="about-guide-paragraph">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── CTA Banner ── */}
        <section id="contact-us" className="flex items-center justify-center bg-[#FAFAFA] py-16">
          <div>
            <h2 className="about-contact-footer-title font-semibold! text-[30px] md:text-[36px] tracking-[-2%]">Ready to Start Your Journey?</h2>
            <p className="about-contact-footer-paragraph leading-[30px]! text-[20px]!">
              Schedule a free 15-minute diagnostic session with our senior consultants today.
            </p>
            <div className="flex justify-center mt-8">
              <PixelButton
                to="/contact"
                variant="secondary"
                label="Contact Us"
              />
            </div>
          </div>
        </section>
      </main>

    </Layout>
  )
}
