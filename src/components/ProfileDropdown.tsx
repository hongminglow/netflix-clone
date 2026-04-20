import { useEffect, useRef, useState } from 'react'
import { defaultProfiles } from '@/data/profiles'
import { useI18n } from '@/i18n'
import { navigate, routes } from '@/lib/router'

type Props = {
  currentProfileId: string
  onSignOut: () => void
}

export function ProfileDropdown({ currentProfileId, onSignOut }: Props) {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const currentProfile = defaultProfiles.find((p) => p.id === currentProfileId) || defaultProfiles[0]
  const otherProfiles = defaultProfiles.filter((p) => p.id !== currentProfileId)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className="profileDropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="profileDropdownTrigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => navigate(routes.profiles)}
      >
        <img src={currentProfile.avatarUrl} alt={currentProfile.name} className="profileDropdownAvatar" />
        <span className={`profileDropdownCaret ${isOpen ? 'isOpen' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="profileDropdownMenu">
          <div className="profileDropdownMenuInner">
            <ul className="profileDropdownList">
              {otherProfiles.map((p) => (
                <li key={p.id}>
                  <button className="profileDropdownItem" onClick={() => navigate(routes.browse)}>
                    <img src={p.avatarUrl} alt="" className="profileDropdownItemAvatar" />
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button className="profileDropdownItem" onClick={() => navigate(routes.profiles)}>
                  <span className="profileDropdownItemIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </span>
                  <span>{t('profiles_manage')}</span>
                </button>
              </li>
              <li>
                <button className="profileDropdownItem" onClick={() => navigate(routes.profiles)}>
                  <span className="profileDropdownItemIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M2 15h10M6 11l-4 4 4 4" />
                    </svg>
                  </span>
                  <span>Transfer Profile</span>
                </button>
              </li>
              <li>
                <button className="profileDropdownItem" onClick={() => navigate(routes.account)}>
                  <span className="profileDropdownItemIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </span>
                  <span>Account</span>
                </button>
              </li>
              <li>
                <button className="profileDropdownItem" onClick={() => {}}>
                  <span className="profileDropdownItemIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span>Help Center</span>
                </button>
              </li>
            </ul>
            <div className="profileDropdownFooter">
              <button
                className="profileDropdownSignOut"
                onClick={() => {
                  onSignOut()
                  navigate(routes.home)
                }}
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
