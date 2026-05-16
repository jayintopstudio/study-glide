/**
 * Normalizes public asset paths and sets loading attributes for production.
 */
export function resolveImageSrc(src) {
  if (!src) return ''
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('/')
  ) {
    return src
  }
  return `/${src}`
}

/**
 * @param {boolean} [priority] - LCP / above-the-fold: eager + fetchPriority high
 * @param {boolean} [decorative] - Empty alt, aria-hidden (marquee duplicates)
 */
export default function OptimizedImage({
  src,
  alt = '',
  priority = false,
  decorative = false,
  className = '',
  width,
  height,
  sizes,
  srcSet,
  ...rest
}) {
  const resolvedSrc = resolveImageSrc(src)

  return (
    <img
      src={resolvedSrc}
      alt={decorative ? '' : alt}
      aria-hidden={decorative ? true : undefined}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={srcSet}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      {...rest}
    />
  )
}
