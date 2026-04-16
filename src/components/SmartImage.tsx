import { useEffect, useMemo, useState } from 'react'

type Props = {
  src: string
  fallbackSrc?: string
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
  const [loaded, setLoaded] = useState(false)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)

  useEffect(() => {
    setLoaded(false)
    setActiveUrl(null)
  }, [initial])

  useEffect(() => {
    let cancelled = false

    const tryLoad = (url: string, next: string | undefined) => {
      const img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.decoding = 'async'
      img.onload = () => {
        if (cancelled) return
        setActiveUrl(url)
        setLoaded(true)
      }
      img.onerror = () => {
        if (cancelled) return
        if (next) {
          tryLoad(next, undefined)
          return
        }
        setActiveUrl(null)
        setLoaded(false)
      }
      img.src = url
    }

    if (initial) tryLoad(initial, fallbackSrc)

    return () => {
      cancelled = true
    }
  }, [fallbackSrc, initial])

  return (
    <div
      className={`${className ?? ''} smartImage ${loaded ? 'isLoaded' : ''}`}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      data-loading={loading}
      data-sizes={sizes}
      style={
        activeUrl
          ? {
              backgroundImage: `url("${activeUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    />
  )
}
