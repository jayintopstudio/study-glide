import Layout from '../components/Layout'
import PixelButton from '../components/PixelButton'
import { countryHeroImages } from '../data/countryHeroImages'

// ─── Data ────────────────────────────────────────────────────

const destinations = [
  {
    name: 'Study in United Kingdom',
    desc: 'World-renowned education with excellent post-study work options.',
    img:  countryHeroImages.uk,
    to:   '/destination/uk',
  },
  {
    name: 'Study in Canada',
    desc: 'Welcoming society and strong post-graduation opportunities.',
    img:  countryHeroImages.canada,
    to:   '/destination/canada',
  },
  {
    name: 'Study in Ireland',
    desc: 'World-renowned education with excellent post-study work options.',
    img:  countryHeroImages.ireland,
    to:   '/destination/ireland',
  },
  {
    name: 'Study in Australia',
    desc: 'Outstanding education and quality of life.',
    img:  countryHeroImages.australia,
    to:   '/destination/australia',
  },
  {
    name: 'Study in the US',
    desc: 'Academic flexibility and global career advantages.',
    img:  countryHeroImages.usa,
    to:   '/destination/usa',
  },
  {
    name: 'Study in Dubai',
    desc: 'Modern, dynamic, and industry-focused education hub.',
    img:  countryHeroImages.dubai,
    to:   '/destination/dubai',
  },
  {
    name: 'Study in New Zealand',
    desc: 'Safe, high-quality education in a beautiful environment.',
    img:  countryHeroImages.newZealand,
    to:   '/destination/new-zealand',
  },
  {
    name: 'Study in Europe',
    desc: 'Affordable, diverse, and culturally rich study options.',
    img:  countryHeroImages.europe,
    to:   '/destination/europe',
  },
]

// ─── Page ────────────────────────────────────────────────────

export default function Destination() {
  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">

            {/* Breadcrumb */}
            <div className="w-full">
              <div className="hero-breadcrumb capitalize! font-semibold!">Destination</div>
            </div>

            {/* Title + subtitle */}
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

        {/* White corner clip */}
        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Destination cards grid ── */}
      <main>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest) => (
              <div key={dest.to} className="flex flex-col group">

                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="mt-6 flex flex-col flex-grow">
                  <h2 className="destination-title text-base! md:text-lg!">{dest.name}</h2>
                  <p className="destination-paragraph">{dest.desc}</p>

                  <PixelButton
                    to={dest.to}
                    variant="ghost"
                    label="View Destination"
                    className="my-4 lg:w-[242px] min-w-[180px]"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>

    </Layout>
  )
}
