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
  ogImageVersion: 3,
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
