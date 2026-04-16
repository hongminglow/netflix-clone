import { useEffect, useMemo, useState } from 'react'

type Props = {
  src: string
  fallbackSrc?: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
}

const transparentPixel =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading,
  sizes,
}: Props) {
  const initial = useMemo(() => src, [src])
  const [current, setCurrent] = useState(initial)
  const [mode, setMode] = useState<'primary' | 'fallback' | 'blank'>('primary')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrent(initial)
    setMode('primary')
    setLoaded(false)
  }, [initial])

  return (
    <img
      className={`${className ?? ''} smartImage ${loaded ? 'isLoaded' : ''}`}
      src={current}
      alt={alt}
      loading={loading}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onLoad={() => {
        if (mode === 'blank') return
        setLoaded(true)
      }}
      onError={() => {
        if (mode === 'primary' && fallbackSrc) {
          setMode('fallback')
          setLoaded(false)
          setCurrent(fallbackSrc)
          return
        }

        if (mode !== 'blank') {
          setMode('blank')
          setLoaded(false)
          setCurrent(transparentPixel)
        }
      }}
    />
  )
}
