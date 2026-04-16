import { useEffect, useMemo, useRef, useState } from 'react'
import type { Movie } from '../data/catalog'
import { image } from '../data/catalog'
import { SmartImage } from './SmartImage'

type Props = {
  title: string
  items: Movie[]
  onSelect: (movie: Movie) => void
}

export function Row({ title, items, onSelect }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const id = useMemo(
    () => `row_${title.toLowerCase().replaceAll(/\s+/g, '_')}`,
    [title],
  )

  const checkScroll = () => {
    if (!scrollerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current
    setShowLeft(scrollLeft > 0)
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [items])

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.86) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="row" aria-label={title}>
      <div className="rowHeader">
        <h2 className="rowTitle">{title}</h2>
      </div>
      <div className="rowRail" aria-labelledby={id}>
        {showLeft && (
          <button
            className="rowNav rowNavLeft"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15.3 5.3 8.6 12l6.7 6.7-1.4 1.4L5.8 12l8.1-8.1 1.4 1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <div className="rowScroller" ref={scrollerRef} onScroll={checkScroll}>
          <div className="rowItems">
            {items.map((m, idx) => (
              <button
                key={`${m.id}-${idx}`}
                className="titleCard"
                onClick={() => onSelect(m)}
                aria-label={m.title}
              >
                <SmartImage
                  src={m.posterUrl}
                  fallbackSrc={image(
                    `high quality cinematic poster for "${m.title}", premium streaming thumbnail, dramatic lighting, centered subject, sharp focus, no text`,
                    'portrait_4_3',
                  )}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
        {showRight && (
          <button
            className="rowNav rowNavRight"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8.7 5.3 15.4 12l-6.7 6.7 1.4 1.4L18.2 12l-8.1-8.1-1.4 1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
