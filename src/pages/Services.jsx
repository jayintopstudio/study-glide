import { useEffect } from 'react'
import Layout from '../components/Layout'
import OptimizedImage from '../components/OptimizedImage'
import PixelButton from '../components/PixelButton'
import { services as serviceItems } from '../data/services'

// ─── Page ────────────────────────────────────────────────────

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-brand-800 text-white">
        <div className="hero-pattern absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />

        <div className="shell pb-20 sm:pb-24 md:pb-28 pt-12 sm:pt-16 md:pt-25">
          <div className="grid grid-cols-1 items-center gap-3">

            {/* Breadcrumb */}
            <div className="w-full">
              <div className="hero-breadcrumb capitalize! font-semibold!">Services</div>
            </div>

            {/* Title + subtitle */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="order-1 col-span-7">
                <h1 className="hero-title text-[32px]! md:text-[40px]! lg:text-[48px]! font-medium! tracking-[-2%] max-w-[632px] leading-[44px]! md:leading-[60px]!">Guiding Your Path to Global Education</h1>
              </div>
              <div className="order-2 col-span-5">
                <p className="hero-paragraph text-base! lg:text-[20px]! leading-7.5">
                  At StudyGlide Educational Consult, we are committed to helping students worldwide achieve their dreams of studying abroad through professional, transparent, and result-oriented services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* White corner clip */}
        <div className="absolute -bottom-px right-0 h-20 w-28 bg-white [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      </section>

      {/* ── Main ── */}
      <main>

        {/* Section heading */}
        <div id="mission-statement" className="shell py-16 md:py-25">
          <h2 className="text-center font-inter font-semibold text-2xl lg:text-[36px] lg:leading-[44px] lg:my-9 tracking-tight text-[#181D27]">
            Our Core Services Include
          </h2>
        </div>

        {/* ── Alternating service rows ── */}
        <section id="service-stories" className="my-2">
          <div className="flex flex-col gap-y-20">
            {serviceItems.map((service, index) => {
              const isEven = index % 2 !== 0
              return (
                <div
                  key={service.id}
                  className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-full lg:max-w-[500px] mx-auto lg:w-1/2 order-2 lg:order-none px-4 py-8 ${
                      isEven
                        ? ''
                        : ''
                    }`}
                  >
                    <h2 className="service-title text-[24px]! md:text-[30px]!">{service.titleLong}</h2>
                    <p className="service-paragraph text-base! lg:text-lg!">{service.bodyLong}</p>

                    <PixelButton
                      to="/contact"
                      variant="ghost"
                      label="Talk to Us"
                      className="my-4 w-full lg:w-[242px] min-w-[180px] pxbtn--arrow-lg"
                    />
                  </div>

                  {/* Image side */}
                  <div className="relative w-full lg:w-1/2 order-1 lg:order-none">
                    <OptimizedImage
                      src={service.img}
                      alt={service.titleLong}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </main>
    </Layout>
  )
}
