/** Site-wide SEO / Open Graph — single image for every page (including /contact). */
export const SITE = {
  name: 'StudyGlide Educational Consult',
  shortName: 'StudyGlide',
  url: 'https://studyglidedu.com',
  description: 'Expert guidance for Nigerian students ready to study abroad.',
  /**
   * Social + link preview image (NOT page photos like Contact’s Image(12).png).
   * Replace public/og-image.png, then bump ogImageVersion so caches refresh.
   */
  ogImageVersion: 4,
  ogImagePath: '/og-image.png',
  ogImageWidth: 512,
  ogImageHeight: 512,
}

export function getOgImageUrl() {
  return `${SITE.url}${SITE.ogImagePath}?v=${SITE.ogImageVersion}`
}

export function getCanonicalUrl(pathname) {
  if (!pathname || pathname === '/') return `${SITE.url}/`
  return `${SITE.url}${pathname.endsWith('/') ? pathname.slice(0, -1) : pathname}`
}

/** Next.js metadata for a route (server components). */
export function pageMetadata({ title, description, path = '/' }) {
  const pageTitle = title ? `${title} | ${SITE.shortName}` : SITE.name
  const pageDescription = description ?? SITE.description
  const url = getCanonicalUrl(path)
  const image = getOgImageUrl()

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: image, width: SITE.ogImageWidth, height: SITE.ogImageHeight }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  }
}
