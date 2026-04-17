import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Movie } from '../data/catalog'
import { image } from '../data/catalog'
import { SmartImage } from './SmartImage'

type Props = {
  title: string
  items: Movie[]
  onSelect: (m: Movie) => void
}

export function Row({ title, items, onSelect }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps',
    dragFree: true,
  })

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const id = useMemo(
    () => `row_${title.toLowerCase().replaceAll(/\s+/g, '_')}`,
    [title],
  )

  const onSelectEmbla = useCallback(() => {
    if (!emblaApi) return
    // Embla has a tiny floating point rounding issue sometimes where canScrollPrev() is false when scroll is at 0.001
    // Checking scrollProgress directly provides more robust fallback
    setShowLeft(emblaApi.canScrollPrev() || emblaApi.scrollProgress() > 0.01)
    setShowRight(emblaApi.canScrollNext() || emblaApi.scrollProgress() < 0.99)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelectEmbla()
    emblaApi.on('reInit', onSelectEmbla)
    emblaApi.on('select', onSelectEmbla)
    emblaApi.on('scroll', onSelectEmbla)
    emblaApi.on('settle', onSelectEmbla)
  }, [emblaApi, onSelectEmbla])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="row" aria-label={title}>
      <div className="rowHeader">
        <h2 className="rowTitle">{title}</h2>
      </div>
      <div className="rowRail" aria-labelledby={id}>
        {showLeft && (
          <button
            className="rowNav rowNavLeft"
            onClick={scrollPrev}
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
        <div className="rowScroller" ref={emblaRef}>
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
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
        {showRight && (
          <button
            className="rowNav rowNavRight"
            onClick={scrollNext}
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
