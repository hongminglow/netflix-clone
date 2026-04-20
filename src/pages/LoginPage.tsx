import { useMemo, useState } from 'react'
import { NetflixLogo } from '@/components/NetflixLogo'
import { image } from '@/data/catalog'
import { useI18n } from '@/i18n'
import { navigate, routes } from '@/lib/router'
import { verifyUser } from '@/lib/users'

type Props = {
  onLogin: (user: { id: string; email: string }) => void
}

export function LoginPage({ onLogin }: Props) {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bg = useMemo(
    () =>
      image(
        'cinematic dark background collage of film stills, subtle red glow, premium streaming platform background, realistic photography, no text, wide composition',
        'landscape_16_9',
      ),
    [],
  )

  const emailOk = email.trim().length > 3 && email.includes('@')
  const passOk = password.trim().length >= 4
  const ok = emailOk && passOk

  return (
    <div className="auth">
      <div className="authBg">
        <img src={bg} alt="" />
        <div className="authShade" />
      </div>
      <header className="authHeader">
        <button className="landingBrand" onClick={() => navigate(routes.home)} aria-label="Home">
          <NetflixLogo className="nfLogo" />
        </button>
      </header>
      <main className="authMain">
        <form
          className="authCard"
          onSubmit={(e) => {
            e.preventDefault()
            setTouched(true)
            setError(null)
            if (!ok) return
            const u = verifyUser(email, password)
            if (!u) {
              setError(t('auth_bad_credentials'))
              return
            }
            onLogin({ id: u.id, email: u.email })
            navigate(routes.profiles)
          }}
        >
          <h1 className="authTitle">{t('auth_signIn')}</h1>

          {error && <div className="authError">{error}</div>}
          <label className={`nfField ${touched && !emailOk ? 'isInvalid' : ''}`}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              autoComplete="email"
              placeholder=" "
            />
            <span className="nfFieldLabel">{t('auth_email')}</span>
            <span className="nfFieldHint">{t('auth_email_invalid')}</span>
          </label>
          <label className={`nfField ${touched && !passOk ? 'isInvalid' : ''}`}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
              autoComplete="current-password"
              placeholder=" "
            />
            <span className="nfFieldLabel">{t('auth_password')}</span>
            <span className="nfFieldHint">{t('auth_pass_invalid')}</span>
          </label>

          <button className="nfButton nfButtonRed nfButtonWide" type="submit">
            {t('auth_signIn')}
          </button>

          <div className="authRow">
            <label className="nfCheck">
              <input type="checkbox" defaultChecked />
              <span>{t('auth_remember')}</span>
            </label>
            <a className="authLink" href="#" onClick={(e) => e.preventDefault()}>
              {t('auth_needHelp')}
            </a>
          </div>

          <div className="authMeta">
            <div className="authSmall">
              {t('auth_newTo')}{' '}
              <a
                className="authLinkStrong"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(routes.signup)
                }}
              >
                {t('auth_signupNow')}
              </a>
              .
            </div>
            <div className="authTiny">{t('auth_recap')}</div>
          </div>
        </form>
      </main>
      <footer className="authFooter">
        <div className="landingFooterInner">
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
        </div>
      </footer>
    </div>
  )
}
