import { useMemo, useState } from 'react'
import { NetflixLogo } from '@/components/NetflixLogo'
import { image } from '@/data/catalog'
import { useI18n } from '@/i18n'
import { navigate, routes } from '@/lib/router'
import { createUser, findUserByEmail } from '@/lib/users'

type Props = {
  onSignup: (user: { id: string; email: string }) => void
}

export function SignupPage({ onSignup }: Props) {
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
        <button
          className="landingBrand"
          onClick={() => navigate(routes.home)}
          aria-label="Home"
        >
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
            if (findUserByEmail(email)) {
              setError(t('auth_exists'))
              return
            }
            const u = createUser(email, password)
            onSignup({ id: u.id, email: u.email })
            navigate(routes.profiles)
          }}
        >
          <h1 className="authTitle">{t('auth_signUp')}</h1>

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
              autoComplete="new-password"
              placeholder=" "
            />
            <span className="nfFieldLabel">{t('auth_password')}</span>
            <span className="nfFieldHint">{t('auth_pass_invalid')}</span>
          </label>

          <button className="nfButton nfButtonRed nfButtonWide" type="submit">
            {t('auth_signUp')}
          </button>

          <div className="authMeta">
            <div className="authSmall">
              {t('auth_haveAccount')}{' '}
              <a
                className="authLinkStrong"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(routes.login)
                }}
              >
                {t('auth_loginNow')}
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

