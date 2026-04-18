import { useMemo, useState } from 'react'
import { FaqAccordion } from '../components/FaqAccordion'
import { NetflixLogo } from '../components/NetflixLogo'
import { SmartImage } from '../components/SmartImage'
import { TrendingRow } from '../components/TrendingRow'
import { movies } from '../data/catalog'
import { image } from '../data/catalog'
import { useI18n, type Lang } from '../i18n'
import { navigate, routes } from '../lib/router'

type Props = {
  authed: boolean
  onGetStarted: () => void
}

export function LandingPage({ authed, onGetStarted }: Props) {
  const { lang, setLang, t } = useI18n()
  const [email, setEmail] = useState('')

  const tv = useMemo(
    () =>
      image(
        'modern living room at night with a large TV, cinematic lighting, subtle red glow, realistic photo, shallow depth of field, no logos, no text',
        'landscape_16_9',
      ),
    [],
  )

  const mobile = useMemo(
    () =>
      image(
        'hand holding a smartphone with a dark movie screen glow, moody lighting, realistic photography, no UI text, no logos',
        'portrait_16_9',
      ),
    [],
  )

  const devices = useMemo(
    () =>
      image(
        'minimal still life of modern devices (tv, laptop, tablet, phone) on dark background with soft cinematic rim light, realistic photo, no logos, no text',
        'landscape_16_9',
      ),
    [],
  )

  const kids = useMemo(
    () =>
      image(
        'cinematic family-friendly scene, child silhouette watching colorful animated characters on a screen, warm glow in dark room, realistic photography, no logos, no text',
        'landscape_16_9',
      ),
    [],
  )

  return (
    <div className="landing">
      <header className="landingHeader">
        <button className="landingBrand" onClick={() => navigate(routes.home)} aria-label="Home">
          <NetflixLogo className="nfLogo" />
        </button>
        <div className="landingHeaderRight">
          <label className="langSelect">
            <span className="langIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.3a15.7 15.7 0 0 0-1.3-6 8 8 0 0 1 4.6 6ZM12 4.1c.9 1.4 1.7 3.9 2 6.9H10c.3-3 1.1-5.5 2-6.9ZM4.1 13H7.4c.3 2.3 1 4.4 1.9 6a8 8 0 0 1-5.2-6Zm3.3-2H4.1a8 8 0 0 1 5.2-6c-.9 1.6-1.6 3.7-1.9 6Zm2.6 2h4c-.3 3-1.1 5.5-2 6.9-.9-1.4-1.7-3.9-2-6.9Zm6.6 0h3.3a8 8 0 0 1-4.6 6c.8-1.6 1.5-3.7 1.3-6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
            >
              <option value="en">English</option>
              <option value="bm">Bahasa Melayu</option>
              <option value="zh">中文</option>
            </select>
          </label>
          <button
            className="nfButton nfButtonRed"
            onClick={() => navigate(authed ? routes.profiles : routes.login)}
          >
            {t('sign_in')}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="heroBg">
            <div className="heroPosterGrid">
              {[
                'https://image.tmdb.org/t/p/w342/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
                'https://image.tmdb.org/t/p/w342/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg',
                'https://image.tmdb.org/t/p/w342/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
                'https://image.tmdb.org/t/p/w342/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
                'https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                'https://image.tmdb.org/t/p/w342/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg',
                'https://image.tmdb.org/t/p/w342/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
                'https://image.tmdb.org/t/p/w342/zU0htIQ5Glsd6l75355KntvH2f6.jpg',
                'https://image.tmdb.org/t/p/w342/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
                'https://image.tmdb.org/t/p/w342/rTmal9fOb0hEWabwgJSiFJGwqHC.jpg',
                'https://image.tmdb.org/t/p/w342/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
                'https://image.tmdb.org/t/p/w342/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
                'https://image.tmdb.org/t/p/w342/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
                'https://image.tmdb.org/t/p/w342/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
                'https://image.tmdb.org/t/p/w342/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg',
                'https://image.tmdb.org/t/p/w342/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg',
                'https://image.tmdb.org/t/p/w342/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
                'https://image.tmdb.org/t/p/w342/zU0htIQ5Glsd6l75355KntvH2f6.jpg',
                'https://image.tmdb.org/t/p/w342/rTmal9fOb0hEWabwgJSiFJGwqHC.jpg',
                'https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
              ].map((src, i) => (
                <div key={i} className="heroPosterCell">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="heroShade" />
          </div>
          <div className="heroInner">
            <h1 className="heroTitle">{t('hero_title')}</h1>
            <p className="heroSub">{t('hero_sub')}</p>
            <p className="heroHint">{t('hero_hint')}</p>
            <div className="heroCta">
              <label className="nfField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoComplete="email"
                  placeholder=" "
                />
                <span className="nfFieldLabel">{t('email')}</span>
              </label>
              <button className="nfButton nfButtonBig nfButtonRed" onClick={onGetStarted}>
                {t('get_started')}
                <span aria-hidden="true" className="nfChevron">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M9.3 18.7 16 12 9.3 5.3l1.4-1.4 8.1 8.1-8.1 8.1-1.4-1.4Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="heroCurve" aria-hidden="true" />
        </section>

        <section className="landingSection">
          <div className="landingSectionInner">
            <TrendingRow
              title={t('trending_now')}
              items={movies.slice(0, 10)}
              onSelect={() => onGetStarted()}
            />
          </div>
        </section>

        <section className="reasons">
          <div className="reasonsInner">
            <h2 className="reasonsTitle">{t('more_reasons')}</h2>
            <div className="reasonsGrid">
              <div className="reasonCard">
                <div className="reasonCopy">
                  <h3>{t('feature_tv_title')}</h3>
                  <p>{t('feature_tv_body')}</p>
                </div>
                <div className="reasonMedia">
                  <SmartImage src={tv} alt="" loading="lazy" />
                </div>
              </div>
              <div className="reasonCard">
                <div className="reasonCopy">
                  <h3>{t('feature_dl_title')}</h3>
                  <p>{t('feature_dl_body')}</p>
                </div>
                <div className="reasonMedia">
                  <SmartImage src={mobile} alt="" loading="lazy" />
                </div>
              </div>
              <div className="reasonCard">
                <div className="reasonCopy">
                  <h3>{t('feature_everywhere_title')}</h3>
                  <p>{t('feature_everywhere_body')}</p>
                </div>
                <div className="reasonMedia">
                  <SmartImage src={devices} alt="" loading="lazy" />
                </div>
              </div>
              <div className="reasonCard">
                <div className="reasonCopy">
                  <h3>{t('feature_kids_title')}</h3>
                  <p>{t('feature_kids_body')}</p>
                </div>
                <div className="reasonMedia">
                  <SmartImage src={kids} alt="" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="faqInner">
            <h2 className="faqTitle">{t('faq_title')}</h2>
            <FaqAccordion
              items={[
                { question: t('faq_q1'), answer: t('faq_a1') },
                { question: t('faq_q2'), answer: t('faq_a2') },
                { question: t('faq_q3'), answer: t('faq_a3') },
                { question: t('faq_q4'), answer: t('faq_a4') },
                { question: t('faq_q5'), answer: t('faq_a5') },
                { question: t('faq_q6'), answer: t('faq_a6') },
              ]}
            />

            <div className="faqCta">
              <p className="faqHint">{t('hero_hint')}</p>
              <div className="heroCta heroCtaBottom">
                <label className="nfField">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputMode="email"
                    autoComplete="email"
                    placeholder=" "
                  />
                  <span className="nfFieldLabel">{t('email')}</span>
                </label>
                <button className="nfButton nfButtonBig nfButtonRed" onClick={onGetStarted}>
                  {t('get_started')}
                  <span aria-hidden="true" className="nfChevron">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M9.3 18.7 16 12 9.3 5.3l1.4-1.4 8.1 8.1-8.1 8.1-1.4-1.4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="landingFooter">
          <div className="landingFooterInner">
            <div className="footerQuestions">{t('footer_questions')}</div>
            <div className="footerGrid">
              <a href="#" onClick={(e) => e.preventDefault()}>
                FAQ
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Help Center
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
            </div>
            <div className="footerNote">Netflix clone demo (no affiliation).</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
