import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, getCanonicalUrl, getOgImageUrl } from '../config/siteMeta'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Keeps one OG image on every route so scrapers don’t pick random page images
 * (e.g. /Image(12).png on Contact).
 */
export default function Seo({ title, description }) {
  const { pathname } = useLocation()
  const pageTitle = title ? `${title} | ${SITE.shortName}` : SITE.name
  const pageDescription = description ?? SITE.description
  const canonical = getCanonicalUrl(pathname)
  const ogImage = getOgImageUrl()

  useEffect(() => {
    document.title = pageTitle

    upsertMeta('name', 'description', pageDescription)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', pageTitle)
    upsertMeta('property', 'og:description', pageDescription)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:secure_url', ogImage)
    upsertMeta('property', 'og:image:width', String(SITE.ogImageWidth))
    upsertMeta('property', 'og:image:height', String(SITE.ogImageHeight))

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', pageDescription)
    upsertMeta('name', 'twitter:image', ogImage)
  }, [pageTitle, pageDescription, canonical, ogImage])

  return null
}
