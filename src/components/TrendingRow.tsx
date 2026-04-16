import { useMemo, useRef } from 'react'
import type { Movie } from '../data/catalog'
import { image } from '../data/catalog'
import { SmartImage } from './SmartImage'

type Props = {
  title: string
  items: Movie[]
  onSelect?: (movie: Movie) => void
}

export function TrendingRow({ title, items, onSelect }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const id = useMemo(
    () => `trending_${title.toLowerCase().replaceAll(/\s+/g, '_')}`,
    [title],
  )

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.86) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="trending" aria-label={title}>
      <div className="trendingHeader">
        <h2 className="trendingTitle" id={id}>
          {title}
        </h2>
      </div>

      <div className="trendingRail" aria-labelledby={id}>
        <button
          className="rowNav rowNavLeft"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            scrollBy(-1)
          }}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15.3 5.3 8.6 12l6.7 6.7-1.4 1.4L5.8 12l8.1-8.1 1.4 1.4Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="rowScroller trendingScroller" ref={scrollerRef}>
          <div className="trendingItems">
            {items.map((m, idx) => (
              <button
                key={m.id}
                className="trendingCard"
                onClick={() => onSelect?.(m)}
                aria-label={m.title}
              >
                <div className="trendingRank" aria-hidden="true">
                  {idx + 1}
                </div>
                <div className="trendingThumb">
                  <SmartImage
                    src={m.posterUrl}
                    fallbackSrc={image(
                      `high quality cinematic poster for "${m.title}", premium streaming thumbnail, dramatic lighting, centered subject, sharp focus, no text`,
                      'portrait_4_3',
                    )}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          className="rowNav rowNavRight"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            scrollBy(1)
          }}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M8.7 18.7 15.4 12 8.7 5.3l1.4-1.4L18.2 12l-8.1 8.1-1.4-1.4Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
