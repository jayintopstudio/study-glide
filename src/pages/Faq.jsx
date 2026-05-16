import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import OptimizedImage from '../components/OptimizedImage'
import PixelButton from '../components/PixelButton'

// ─── Data ────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What services does Studyglide Educational Consult provide?',
    a: 'Studyglide Educational Consult helps students achieve their dream of studying abroad. Our services include university selection, application processing, admission guidance, visa assistance, scholarship guidance, interview preparation, and pre-departure support.',
  },
  {
    q: 'Which countries can I apply to through Studyglide?',
    a: 'We assist students with admissions to universities in countries such as the United Kingdom, Canada, United States, Australia, Ireland, and some European countries depending on the student\'s academic background and preferences.',
  },
  {
    q: 'How much does it cost to study abroad?',
    a: {
      intro: 'The cost depends on the country, university, and course. On average:',
      bullets: [
        'UK tuition fees: £11,500 – £20,000 per year',
        'Living expenses: £10,539 – £13,761 per year',
      ],
      outro: 'We help students find affordable universities and flexible payment options.',
    },
  },
  {
    q: 'Can I study abroad with low grades?',
    a: 'Yes. Many universities consider students with average grades. We help identify universities that match your academic profile and improve your chances of admission.',
  },
  {
    q: 'Do I need IELTS or other English tests?',
    a: 'Some universities require English tests such as IELTS, TOEFL, or PTE Academic. However, some universities offer IELTS waivers depending on your previous education.',
  },
  {
    q: 'Can Studyglide help me get scholarships?',
    a: 'Yes. We guide students on available scholarships and university discounts that can reduce tuition fees.',
  },
  {
    q: 'How long does the admission process take?',
    a: 'Admissions typically take 1–6 weeks, depending on the university and the completeness of your documents.',
  },
  {
    q: 'What documents are required to apply?',
    a: {
      intro: 'Common documents include:',
      bullets: [
        'International passport',
        'Academic transcripts and certificates',
        'Personal statement',
        'Curriculum Vitae (CV)',
        'English test results (if required)',
      ],
    },
  },
  {
    q: 'Can I work while studying abroad?',
    a: 'Yes. For example, students studying in the United Kingdom can work up to 20 hours per week during term time and full-time during holidays. Regulations differ by country; we can explain the rules for your chosen destination.',
  },
  {
    q: 'Can I stay and work after graduation?',
    a: 'Some countries offer post-study work visas. For example, the UK Graduate Route allows international students to stay and work for 2 years after completing their degree.',
  },
  {
    q: 'How long does the visa process take?',
    a: 'Visa processing usually takes 1–6 weeks, depending on the country and embassy requirements.',
  },
  {
    q: 'What happens if my visa is refused?',
    a: 'If a visa refusal occurs, Studyglide will help review the reasons and guide you on reapplication or alternative options.',
  },
  {
    q: 'Do I need to pay the full tuition fee before traveling?',
    a: 'Most universities require a tuition deposit before issuing the final documents for visa application.',
  },
  {
    q: 'When should I start my study abroad application?',
    a: 'It is best to start your application 4–9 months before your intended intake to allow enough time for admission and visa processing.',
  },
  {
    q: 'How do I start my study abroad application with Studyglide?',
    a: {
      intro: 'You can begin by contacting Studyglide Educational Consult through:',
      bullets: ['WhatsApp', 'Email', 'Online consultation'],
      outro: 'Our team will guide you through the entire process step-by-step.',
    },
  },
]

const teamAvatars = [
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', alt: 'Team member 1', cls: 'h-12 w-12' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', alt: 'Team member 2', cls: 'h-14 w-14 z-10 scale-110' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', alt: 'Team member 3', cls: 'h-12 w-12' },
]

function faqMatchesQuery(faq, q) {
  if (faq.q.toLowerCase().includes(q)) return true
  if (typeof faq.a === 'string') return faq.a.toLowerCase().includes(q)
  const parts = [faq.a.intro, faq.a.outro, ...(faq.a.bullets || [])].filter(Boolean)
  return parts.some((part) => part.toLowerCase().includes(q))
}

function FaqPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

/** `answer` is either a plain string or { intro?, bullets?, outro? }. */
function FaqAnswerBody({ answer }) {
  if (typeof answer === 'string') {
    return <p className="faq-paragraph mt-0!">{answer}</p>
  }

  const { intro, bullets = [], outro } = answer

  return (
    <div className="space-y-3">
      {intro ? <p className="faq-paragraph mt-0!">{intro}</p> : null}
      {bullets.length > 0 ? (
        <ul className="ml-5 list-disc space-y-2 pl-1 text-[0.875rem] leading-[1.65] text-[#535862]">
          {bullets.map((line, j) => (
            <li key={j}>{line}</li>
          ))}
        </ul>
      ) : null}
      {outro ? <p className="faq-paragraph mt-0!">{outro}</p> : null}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((faq) => faqMatchesQuery(faq, q))
  }, [query])

  useEffect(() => {
    setOpenIndex(0)
  }, [query])

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">

            <div className="w-full">
              <div className="hero-breadcrumb capitalize! font-semibold!">Frequently Asked Questions</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="order-1 col-span-7">
                <h1 className="hero-title text-[32px]! md:text-[40px]! lg:text-[48px]! font-medium! tracking-[-2%] max-w-[632px] leading-[44px]! md:leading-[60px]!">What services does StudyGlide Educational Consult provide?</h1>
              </div>
              <div className="order-2 col-span-5">
                <p className="hero-paragraph text-base! lg:text-[20px]! leading-7.5">
                  At StudyGlide Educational Consult, we are committed to helping students worldwide achieve their dreams of studying abroad through professional, transparent, and result-oriented services.StudyGlide Educational Consult helps students achieve their dream of studying abroad. Our services include university selection, application processing, admission guidance, visa assistance, scholarship guidance, interview preparation, and pre-departure support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Search + accordion ── */}
      <main className="bg-[#FAFAFA]">
        <div className="shell py-16 sm:py-20">
          <div className="faq-search-wrap">
            <span className="faq-search-icon" aria-hidden>
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="search"
              className="faq-search"
              placeholder="Search questions… (e.g. visa, scholarship, IELTS)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search frequently asked questions"
            />
          </div>

          <div className="faq-list">
            {filtered.length === 0 ? (
              <p className="faq-empty">
                No questions match &ldquo;{query}&rdquo;.{' '}
                <Link to="/contact">Ask us directly →</Link>
              </p>
            ) : (
              filtered.map((faq, i) => (
                <div key={faq.q} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    aria-expanded={openIndex === i}
                  >
                    {faq.q}
                    <span className="faq-icon">
                      <FaqPlusIcon />
                    </span>
                  </button>
                  <div className="faq-a">
                    <div className="faq-a-inner">
                      <FaqAnswerBody answer={faq.a} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <section id="faq-contacts" className="faq-cta-card mb-8">
            <div className="flex -space-x-3 justify-center mb-6">
              {teamAvatars.map((a) => (
                <OptimizedImage
                  key={a.alt}
                  src={a.src}
                  alt={a.alt}
                  className={`${a.cls} rounded-full border-2 border-white object-cover`}
                />
              ))}
            </div>

            <h2 className="text-xl font-semibold text-[#181D27] mb-2">Still have questions?</h2>
            <p className="text-[#535862] mb-8 max-w-md mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
            </p>

            <PixelButton
              to="/contact"
              variant="secondary"
              label="Contact Support"
            />
          </section>
        </div>
      </main>

    </Layout>
  )
}
