import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Movie } from "@/data/catalog";
import { image } from "@/data/catalog";
import { SmartImage } from "@/components/SmartImage";
import { buildWatchUrl, navigate } from "@/lib/router";
import { useMyList } from "@/hooks/useMyList";
import { useStore } from "@/store";

type Props = {
  title: string;
  items: Movie[];
  onSelect: (m: Movie) => void;
};

function getMatchPct(id: string) {
  const n = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 85 + (n % 14);
}

export function Row({ title, items, onSelect }: Props) {
  const { session } = useStore();
  const profileId = session.profile?.id ?? "";
  const myList = useMyList(profileId);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const id = useMemo(
    () => `row_${title.toLowerCase().replaceAll(/\s+/g, "_")}`,
    [title],
  );

  const onSelectEmbla = useCallback(() => {
    if (!emblaApi) return;
    setShowLeft(emblaApi.canScrollPrev());
    setShowRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelectEmbla();
    emblaApi.on("reInit", onSelectEmbla);
    emblaApi.on("select", onSelectEmbla);
    emblaApi.on("scroll", onSelectEmbla);
    emblaApi.on("settle", onSelectEmbla);
  }, [emblaApi, onSelectEmbla]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="row" aria-label={title}>
      <div className="rowHeader">
        <h2 className="rowTitle" id={id}>
          {title}
        </h2>
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
              <div key={`${m.id}-${idx}`} className="titleCardWrap">
                <button
                  className="titleCard"
                  onClick={() => onSelect(m)}
                  aria-label={m.title}
                >
                  <div className="titleCardImg">
                    <SmartImage
                      src={m.posterUrl}
                      fallbackSrc={image(
                        `high quality cinematic poster for "${m.title}", premium streaming thumbnail, dramatic lighting, centered subject, sharp focus, no text`,
                        "portrait_4_3",
                      )}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="titleCardOverlay" aria-hidden="true">
                    <div className="titleCardOverlayBtns">
                      <button
                        className="tcBtn tcBtnPlay"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(buildWatchUrl(m.id));
                        }}
                        aria-label={`Play ${m.title}`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l12-7L8 5Z" />
                        </svg>
                      </button>
                      <button
                        className={`tcBtn ${myList.has(m.id) ? "tcBtnListOn" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          myList.toggle(m.id);
                        }}
                        aria-label={
                          myList.has(m.id)
                            ? "Remove from My List"
                            : "Add to My List"
                        }
                      >
                        {myList.has(m.id) ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        )}
                      </button>
                      <button
                        className="tcBtn tcBtnInfo"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(m);
                        }}
                        aria-label={`More info about ${m.title}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </button>
                    </div>
                    <div className="titleCardOverlayTitle">{m.title}</div>
                    <div className="titleCardOverlayMeta">
                      <span className="tcMatch">
                        {getMatchPct(m.id)}% Match
                      </span>
                      <span className="tcMaturity">{m.maturity}</span>
                      <span className="tcDuration">{m.duration}</span>
                    </div>
                    <div className="titleCardOverlayGenres">
                      {m.genres.slice(0, 2).join(" • ")}
                    </div>
                  </div>
                </button>
              </div>
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
  );
}
