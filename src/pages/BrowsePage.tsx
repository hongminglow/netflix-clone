import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import { NetflixLogo } from "@/components/NetflixLogo";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { Row } from "@/components/Row";
import { getMovie, image, movies, rows, type Movie } from "@/data/catalog";
import { useMyList } from "@/hooks/useMyList";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useI18n } from "@/i18n";
import { buildWatchUrl, navigate, routes } from "@/lib/router";
import { SmartImage } from "@/components/SmartImage";

type RatingValue = "dislike" | "like" | "love";

type Props = {
  profile: { id: string; name: string };
  onSignOut: () => void;
  view?: "home" | "myList";
};

function getMatchPct(id: string) {
  const sum = id
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return 85 + (sum % 14);
}

export function BrowsePage({ profile, onSignOut, view = "home" }: Props) {
  const { t } = useI18n();
  const [solidNav, setSolidNav] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);
  const myList = useMyList(profile.id);
  const [ratings, setRatings] = useLocalStorageState<
    Record<string, RatingValue>
  >(`nf.ratings.${profile.id}`, {});
  const [ratingMenuId, setRatingMenuId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ratingWrapRef = useRef<HTMLDivElement>(null);
  const ratingPopoverRef = useRef<HTMLDivElement>(null);
  const ratingCloseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setSolidNav(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (ratingCloseTimerRef.current) {
        window.clearTimeout(ratingCloseTimerRef.current);
      }
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchBlur = () => {
    if (!query) setIsSearchOpen(false);
  };

  const hero = useMemo(() => getMovie("n1") ?? movies[0], []);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    const ids = new Set(
      movies
        .filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.synopsis.toLowerCase().includes(q) ||
            m.genres.some((g) => g.toLowerCase().includes(q)),
        )
        .map((m) => m.id),
    );
    return rows
      .map((r) => ({ ...r, items: r.items.filter((id) => ids.has(id)) }))
      .filter((r) => r.items.length > 0);
  }, [query]);

  const visibleRows = useMemo(() => {
    if (view === "myList") {
      return [
        {
          id: "my_list",
          title: t("nav_myList"),
          items: myList.ids,
        },
      ].filter((r) => r.items.length > 0);
    }

    const base: { id: string; title: string; items: readonly string[] }[] = [
      ...filteredRows,
    ];
    if (myList.ids.length === 0) return base;

    const insertIdx = base.findIndex((r) => r.id === "r2");
    const finalIdx =
      insertIdx !== -1 ? insertIdx + 1 : Math.min(2, base.length);

    base.splice(finalIdx, 0, {
      id: "my_list",
      title: t("nav_myList"),
      items: myList.ids,
    });
    return base;
  }, [filteredRows, myList.ids, t, view]);

  const setRating = (movieId: string, value: RatingValue) => {
    setRatings((prev) => {
      if (prev[movieId] === value) {
        const next = { ...prev };
        delete next[movieId];
        return next;
      }
      return { ...prev, [movieId]: value };
    });
    setRatingMenuId(null);
  };

  const openRatingMenu = (movieId: string) => {
    if (ratingCloseTimerRef.current) {
      window.clearTimeout(ratingCloseTimerRef.current);
      ratingCloseTimerRef.current = null;
    }
    setRatingMenuId(movieId);
  };

  const scheduleRatingMenuClose = (event?: React.MouseEvent<HTMLElement>) => {
    const nextTarget = event?.relatedTarget as Node | null;
    if (
      nextTarget &&
      (ratingWrapRef.current?.contains(nextTarget) ||
        ratingPopoverRef.current?.contains(nextTarget))
    ) {
      return;
    }

    if (ratingCloseTimerRef.current) {
      window.clearTimeout(ratingCloseTimerRef.current);
    }

    ratingCloseTimerRef.current = window.setTimeout(() => {
      setRatingMenuId(null);
      ratingCloseTimerRef.current = null;
    }, 120);
  };

  return (
    <div className="browse">
      <header className={`browseTopBar ${solidNav ? "isSolid" : ""}`}>
        <div className="browseTopBarInner">
          <button
            className="browseBrand"
            onClick={() => navigate(routes.browse)}
            aria-label="Browse"
          >
            <NetflixLogo className="nfLogo nfLogoSmall" />
          </button>
          <nav className="browseNav" aria-label="Primary">
            <button
              className={`browseNavLink ${view === "home" ? "isActive" : ""}`}
              onClick={() => navigate(routes.browse)}
            >
              {t("nav_home")}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t("nav_tv")}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t("nav_movies")}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t("nav_new")}
            </button>
            <button
              className={`browseNavLink ${view === "myList" ? "isActive" : ""}`}
              onClick={() => navigate(routes.myList)}
            >
              {t("nav_myList")}
            </button>
          </nav>

          <div className="browseActions">
            <label
              className={`browseSearch ${isSearchOpen ? "isOpen" : ""}`}
              onClick={handleSearchClick}
            >
              <span className="srOnly">Search</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10.5 3a7.5 7.5 0 1 0 4.6 13.5l3.7 3.7 1.4-1.4-3.7-3.7A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
                  fill="currentColor"
                />
              </svg>
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={handleSearchBlur}
                placeholder={t("browse_search_placeholder")}
              />
            </label>
            <button className="notifBtn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z" />
              </svg>
              <span className="notifDot" aria-hidden="true" />
            </button>
            <ProfileDropdown
              currentProfileId={profile.id}
              onSignOut={onSignOut}
            />
          </div>
        </div>
      </header>

      <main>
        {view === "home" && (
          <section className="billboard">
            <div className="billboardBg">
              <SmartImage
                src={hero.backdropUrl}
                fallbackSrc={image(
                  `cinematic wide still for "${hero.title}", premium streaming backdrop, dramatic lighting, deep blacks, high contrast, no text`,
                  "landscape_16_9",
                )}
                alt=""
              />
              <div className="billboardShade" />
            </div>
            <div className="billboardInner">
              <div className="billboardMeta">
                <div className="billboardLabel">{t("billboard_label")}</div>
                <h1 className="billboardTitle">{hero.title}</h1>
                <p className="billboardSynopsis">{hero.synopsis}</p>
                <div className="billboardButtons">
                  <button
                    className="nfButton nfButtonBig nfButtonLight"
                    onClick={() => navigate(buildWatchUrl(hero.id))}
                  >
                    <span className="nfIcon nfIconPlay" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6.5 4.5v15L19 12 6.5 4.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    {t("play")}
                  </button>
                  <button
                    className="nfButton nfButtonBig nfButtonDim"
                    onClick={() => setSelected(hero)}
                  >
                    <span className="nfIcon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 9V7h-2v4H7v2h4v4h2v-4h4v-2h-4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    {t("more_info")}
                  </button>
                </div>
              </div>
              <div className="billboardFade" />
            </div>
          </section>
        )}

        <section className={`rows ${view === "myList" ? "isMyList" : ""}`}>
          {visibleRows.map((r) => (
            <Row
              key={r.id}
              title={r.title}
              items={r.items.map((id) => getMovie(id)!).filter(Boolean)}
              onSelect={(m) => setSelected(m)}
            />
          ))}
          {view === "myList" && visibleRows.length === 0 && (
            <div className="emptyListMessage">
              <p>You haven't added any titles to your list yet.</p>
            </div>
          )}
        </section>

        <footer className="browseFooter">
          <div className="browseFooterInner">
            <div className="browseFooterGrid">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Audio Description
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Help Center
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Gift Cards
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Media Center
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Investor Relations
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Jobs
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Terms of Use
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Privacy
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Cookie Preferences
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Corporate Information
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Contact Us
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Legal Notices
              </a>
            </div>
            <div className="browseFooterSmall">Netflix clone UI demo.</div>
          </div>
        </footer>
      </main>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div className="details">
            <div className="detailsHero">
              <SmartImage
                className="detailsHeroImg"
                src={selected.backdropUrl}
                fallbackSrc={[
                  selected.posterUrl.includes("/w500/")
                    ? selected.posterUrl.replace("/w500/", "/w780/")
                    : selected.posterUrl,
                  image(
                    `cinematic wide still for "${selected.title}", premium streaming backdrop, dramatic lighting, deep blacks, high contrast, no text`,
                    "landscape_16_9",
                  ),
                ]}
                alt=""
              />
              <div className="detailsHeroShade" />
              <div className="detailsHeroInner">
                <div className="detailsTitle">{selected.title}</div>
                <div className="detailsButtons">
                  <button
                    className="nfButton nfButtonBig nfButtonLight"
                    onClick={() => navigate(buildWatchUrl(selected.id))}
                  >
                    <span className="nfIcon nfIconPlay" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6.5 4.5v15L19 12 6.5 4.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    {t("play")}
                  </button>
                  <button
                    className={`nfButton nfButtonCircle ${myList.has(selected.id) ? "isOn" : ""}`}
                    onClick={() => myList.toggle(selected.id)}
                    aria-label={
                      myList.has(selected.id)
                        ? "Remove from My List"
                        : "Add to My List"
                    }
                  >
                    {myList.has(selected.id) ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M9.2 16.6 4.8 12.2l1.4-1.4 3 3 8.6-8.6 1.4 1.4-10 10Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M12 5v14m-7-7h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                  <div
                    className="ratingWrap"
                    ref={ratingWrapRef}
                    onMouseLeave={scheduleRatingMenuClose}
                  >
                    <button
                      className={`nfButton nfButtonCircle ${
                        ratings[selected.id] === "like" ||
                        ratings[selected.id] === "love"
                          ? "isLiked"
                          : ratings[selected.id] === "dislike"
                            ? "isDisliked"
                            : ""
                      }`}
                              onMouseEnter={() => openRatingMenu(selected.id)}
                              onFocus={() => openRatingMenu(selected.id)}
                              onClick={() => openRatingMenu(selected.id)}
                      aria-label="Rate this title"
                    >
                      {ratings[selected.id] === "dislike" ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10 15V19a3 3 0 0 0 3 3l1-7h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-.2-.9l-2-4A2 2 0 0 0 16 6H9a2 2 0 0 0-1.9 1.4l-2 6.7A2 2 0 0 0 7 17h3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 15V6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : ratings[selected.id] === "love" ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <g
                            opacity="0.58"
                            transform="translate(3 1.5) scale(0.82)"
                          >
                            <path
                              d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 9v9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </g>
                          <g transform="translate(-1 2.5) scale(0.9)">
                            <path
                              d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 9v9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                            fill={
                              ratings[selected.id] === "like"
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9v9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>

                    {ratingMenuId === selected.id && (
                      <div
                        className="ratingPopover"
                        ref={ratingPopoverRef}
                        role="menu"
                        onMouseEnter={() => openRatingMenu(selected.id)}
                        onMouseLeave={scheduleRatingMenuClose}
                      >
                        {/* Dislike */}
                        <button
                          className={`ratingOption ${ratings[selected.id] === "dislike" ? "isActive" : ""}`}
                          onClick={() => setRating(selected.id, "dislike")}
                          aria-label="Not for me"
                          role="menuitem"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M10 15V19a3 3 0 0 0 3 3l1-7h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-.2-.9l-2-4A2 2 0 0 0 16 6H9a2 2 0 0 0-1.9 1.4l-2 6.7A2 2 0 0 0 7 17h3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18 15V6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="ratingOptionLabel">Not for me</span>
                        </button>

                        {/* Like */}
                        <button
                          className={`ratingOption ${ratings[selected.id] === "like" ? "isActive" : ""}`}
                          onClick={() => setRating(selected.id, "like")}
                          aria-label="I like this"
                          role="menuitem"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 9v9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="ratingOptionLabel">I like this</span>
                        </button>

                        {/* Love */}
                        <button
                          className={`ratingOption ${ratings[selected.id] === "love" ? "isActive" : ""}`}
                          onClick={() => setRating(selected.id, "love")}
                          aria-label="Love this!"
                          role="menuitem"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g
                              opacity="0.58"
                              transform="translate(3 1.5) scale(0.82)"
                            >
                              <path
                                d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 9v9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </g>
                            <g transform="translate(-1 2.5) scale(0.9)">
                              <path
                                d="M14 9V5a3 3 0 0 0-3-3l-1 7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 .2.9l2 4A2 2 0 0 0 8 18h7a2 2 0 0 0 1.9-1.4l2-6.7A2 2 0 0 0 17 7h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 9v9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </g>
                          </svg>
                          <span className="ratingOptionLabel">Love this!</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="detailsBody">
              <div className="detailsPrimary">
                <div className="detailsMetaLine">
                  <span className="detailsMatchPct">
                    {getMatchPct(selected.id)}% Match
                  </span>
                  <span className="detailsYear">{selected.year}</span>
                  <span className="detailsMaturity">{selected.maturity}</span>
                  <span className="detailsDur">{selected.duration}</span>
                  <span className="detailsHdTag">HD</span>
                </div>
                <p className="detailsSynopsis">{selected.synopsis}</p>
              </div>
              <div className="detailsSecondary">
                <div className="detailsKvp">
                  <div className="detailsKey">{t("details_genres")}</div>
                  <div className="detailsVal">{selected.genres.join(", ")}</div>
                </div>
                <div className="detailsKvp">
                  <div className="detailsKey">{t("details_thisTitleIs")}</div>
                  <div className="detailsVal">
                    {t("details_thisTitleIs_val")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
