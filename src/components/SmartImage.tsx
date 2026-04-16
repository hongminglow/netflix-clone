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
  const [current, setCurrent] = useState(initial)
  const [failedOnce, setFailedOnce] = useState(false)

  useEffect(() => {
    setCurrent(initial)
    setFailedOnce(false)
  }, [initial])

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      loading={loading}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onError={() => {
        if (failedOnce) return
        setFailedOnce(true)
        if (fallbackSrc) setCurrent(fallbackSrc)
      }}
    />
  )
}
