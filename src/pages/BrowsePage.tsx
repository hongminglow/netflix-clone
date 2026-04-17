import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from '../components/Modal'
import { NetflixLogo } from '../components/NetflixLogo'
import { ProfileDropdown } from '../components/ProfileDropdown'
import { Row } from '../components/Row'
import { getMovie, image, movies, rows, type Movie } from '../data/catalog'
import { useMyList } from '../hooks/useMyList'
import { useI18n } from '../i18n'
import { buildWatchUrl, navigate, routes } from '../lib/router'
import { SmartImage } from '../components/SmartImage'

type Props = {
  profile: { id: string; name: string }
  onSignOut: () => void
  view?: 'home' | 'myList'
}

export function BrowsePage({ profile, onSignOut, view = 'home' }: Props) {
  const { t } = useI18n()
  const [solidNav, setSolidNav] = useState(false)
  const [query, setQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selected, setSelected] = useState<Movie | null>(null)
  const myList = useMyList(profile.id)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setSolidNav(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearchClick = () => {
    setIsSearchOpen(true)
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }

  const handleSearchBlur = () => {
    if (!query) setIsSearchOpen(false)
  }

  const hero = useMemo(() => getMovie('n1') ?? movies[0], [])

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    const ids = new Set(
      movies
        .filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.synopsis.toLowerCase().includes(q) ||
            m.genres.some((g) => g.toLowerCase().includes(q)),
        )
        .map((m) => m.id),
    )
    return rows
      .map((r) => ({ ...r, items: r.items.filter((id) => ids.has(id)) }))
      .filter((r) => r.items.length > 0)
  }, [query])

  const visibleRows = useMemo(() => {
    if (view === 'myList') {
      return [
        {
          id: 'my_list',
          title: t('nav_myList'),
          items: myList.ids,
        },
      ].filter((r) => r.items.length > 0)
    }

    const base = [...filteredRows]
    if (myList.ids.length === 0) return base

    const insertIdx = base.findIndex((r) => r.id === 'r2')
    const finalIdx = insertIdx !== -1 ? insertIdx + 1 : Math.min(2, base.length)

    base.splice(finalIdx, 0, { id: 'my_list', title: t('nav_myList'), items: myList.ids })
    return base
  }, [filteredRows, myList.ids, t, view])

  return (
    <div className="browse">
      <header className={`browseTopBar ${solidNav ? 'isSolid' : ''}`}>
        <div className="browseTopBarInner">
          <button className="browseBrand" onClick={() => navigate(routes.browse)} aria-label="Browse">
            <NetflixLogo className="nfLogo nfLogoSmall" />
          </button>
          <nav className="browseNav" aria-label="Primary">
            <button
              className={`browseNavLink ${view === 'home' ? 'isActive' : ''}`}
              onClick={() => navigate(routes.browse)}
            >
              {t('nav_home')}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t('nav_tv')}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t('nav_movies')}
            </button>
            <button className="browseNavLink" onClick={() => {}}>
              {t('nav_new')}
            </button>
            <button
              className={`browseNavLink ${view === 'myList' ? 'isActive' : ''}`}
              onClick={() => navigate(routes.myList)}
            >
              {t('nav_myList')}
            </button>
          </nav>

          <div className="browseActions">
            <label className={`browseSearch ${isSearchOpen ? 'isOpen' : ''}`} onClick={handleSearchClick}>
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
                placeholder={t('browse_search_placeholder')}
              />
            </label>
            <ProfileDropdown currentProfileId={profile.id} onSignOut={onSignOut} />
          </div>
        </div>
      </header>

      <main>
        {view === 'home' && (
          <section className="billboard">
          <div className="billboardBg">
            <SmartImage
              src={hero.backdropUrl}
              fallbackSrc={image(
                `cinematic wide still for "${hero.title}", premium streaming backdrop, dramatic lighting, deep blacks, high contrast, no text`,
                'landscape_16_9',
              )}
              alt=""
            />
            <div className="billboardShade" />
          </div>
          <div className="billboardInner">
            <div className="billboardMeta">
              <div className="billboardLabel">{t('billboard_label')}</div>
              <h1 className="billboardTitle">{hero.title}</h1>
              <p className="billboardSynopsis">{hero.synopsis}</p>
              <div className="billboardButtons">
                <button
                  className="nfButton nfButtonBig nfButtonLight"
                  onClick={() => navigate(buildWatchUrl(hero.id))}
                >
                  <span className="nfIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l12-7L8 5Z" fill="currentColor" />
                    </svg>
                  </span>
                  {t('play')}
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
                  {t('more_info')}
                </button>
              </div>
            </div>
            <div className="billboardFade" />
          </div>
          </section>
        )}

        <section className={`rows ${view === 'myList' ? 'isMyList' : ''}`}>
          {visibleRows.map((r) => (
            <Row
              key={r.id}
              title={r.title}
              items={r.items.map((id) => getMovie(id)!).filter(Boolean)}
              onSelect={(m) => setSelected(m)}
            />
          ))}
          {view === 'myList' && visibleRows.length === 0 && (
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

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="details">
            <div className="detailsHero">
              <SmartImage
                className="detailsHeroImg"
                src={selected.posterUrl}
                fallbackSrc={image(
                  `high quality cinematic poster for "${selected.title}", premium streaming thumbnail, dramatic lighting, centered subject, sharp focus, no text`,
                  'portrait_4_3',
                )}
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
                    <span className="nfIcon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l12-7L8 5Z" fill="currentColor" />
                      </svg>
                    </span>
                    {t('play')}
                  </button>
                  <button
                    className={`nfButton nfButtonCircle ${myList.has(selected.id) ? 'isOn' : ''}`}
                    onClick={() => myList.toggle(selected.id)}
                    aria-label={t('nav_myList')}
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
                  <button className="nfButton nfButtonCircle" onClick={() => {}}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 17.3l-6.2 3.7 1.7-7.1L2 9.4l7.3-.6L12 2l2.7 6.8 7.3.6-5.5 4.5 1.7 7.1-6.2-3.7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="detailsBody">
              <div className="detailsPrimary">
                <div className="detailsMetaLine">
                  <span className="detailsYear">{selected.year}</span>
                  <span className="detailsMaturity">{selected.maturity}</span>
                  <span className="detailsDur">{selected.duration}</span>
                </div>
                <p className="detailsSynopsis">{selected.synopsis}</p>
              </div>
              <div className="detailsSecondary">
                <div className="detailsKvp">
                  <div className="detailsKey">{t('details_genres')}</div>
                  <div className="detailsVal">{selected.genres.join(', ')}</div>
                </div>
                <div className="detailsKvp">
                  <div className="detailsKey">{t('details_thisTitleIs')}</div>
                  <div className="detailsVal">{t('details_thisTitleIs_val')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
