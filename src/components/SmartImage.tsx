import { useEffect, useMemo, useState } from 'react'

type Props = {
  src: string
  fallbackSrc?: string | string[]
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
}

export function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading,
  sizes,
}: Props) {
  const initial = useMemo(() => src, [src])
  const fallbacks = useMemo(
    () => (Array.isArray(fallbackSrc) ? fallbackSrc : fallbackSrc ? [fallbackSrc] : []),
    [fallbackSrc],
  )
  const candidates = useMemo(() => [initial, ...fallbacks].filter(Boolean), [fallbacks, initial])
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIdx(0)
    setLoaded(false)
  }, [initial])

  const activeUrl = candidates[idx] ?? ''

  return (
    <div className={`${className ?? ''} smartImage ${loaded ? 'isLoaded' : ''}`}>
      {activeUrl ? (
        <img
          src={activeUrl}
          alt={alt}
          loading={loading}
          sizes={sizes}
          referrerPolicy="no-referrer"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false)
            setIdx((v) => (v + 1 < candidates.length ? v + 1 : v))
          }}
        />
      ) : null}
    </div>
  )
}
