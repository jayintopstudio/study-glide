import Layout from './Layout'
import OptimizedImage from './OptimizedImage'
import PixelButton from './PixelButton'

/**
 * Shared layout for all country destination pages.
 *
 * Props:
 *  title       – e.g. "Study In UK"
 *  heroImage   – URL path under `public/` (e.g. from `countryHeroImages` in `src/data/countryHeroImages.js`)
 *  description – paragraph text (JSX or string)
 *  schoolsLabel – heading for the schools list
 *  schools     – string[]
 */
export default function CountryPage({ title, heroImage, description, schoolsLabel, schools }) {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">
            <span className="text-center hero-breadcrumb capitalize! font-semibold! block!">Destination</span>
            <h1 className="text-center hero-title mb-0 text-[32px]! md:text-[40px]! lg:text-[48px]! font-medium! tracking-[-2%] leading-[44px]! md:leading-[60px]!">{title}</h1>
          </div>
        </div>

        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Main ── */}
      <main>
        {/* Hero image */}
        <div className="shell -mt-15 relative z-10">
          <OptimizedImage
            src={heroImage}
            alt={title}
            priority
            className="w-full h-[400px] md:h-[600px] object-cover shadow-card"
          />
        </div>

        <article className="shell py-16 md:py-24">
          <div className="max-w-3xl mx-auto">

            {/* Description + Apply Now */}
            <div className="border-b border-b-slate-200 py-4 my-2">
              <p className="pb-8 mb-4 font-inter text-[16px] lg:text-[18px] leading-[28px] text-[#535862]">
                {description}
              </p>

              <PixelButton
                to="/applicants"
                variant="secondary"
                label="Apply Now"
                className="my-4 lg:w-[242px] min-w-[180px]"
              />
            </div>

            {/* Schools list */}
            {schools && schools.length > 0 && (
              <>
                <h2 className="font-inter font-semibold text-[24px] leading-[32px] mb-6 mt-8 text-[#181D27] tracking-[0%]">
                  {schoolsLabel}
                </h2>
                <article className="pl-3 py-2">
                  <ul className="list-disc list-outside ml-6 space-y-2">
                    {schools.map((school, i) => (
                      <li key={i} className="font-inter font-normal text-[#535862] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px] mb-2">
                        {school}
                      </li>
                    ))}
                  </ul>
                </article>
              </>
            )}

          </div>
        </article>
      </main>
    </Layout>
  )
}
