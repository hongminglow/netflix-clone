import { useState } from 'react'
import { NetflixLogo } from '../components/NetflixLogo'
import { defaultProfiles } from '../data/profiles'
import { navigate, routes } from '../lib/router'

type Props = {
  currentProfileId: string
}

const PLANS = [
  {
    id: 'standard-ads',
    name: 'Standard\nwith ads',
    price: 'RM 18.90',
    quality: 'Full HD',
    resolution: '1080p',
    downloads: false,
    screens: 2,
    isCurrent: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 'RM 38.90',
    quality: 'Full HD',
    resolution: '1080p',
    downloads: true,
    screens: 2,
    isCurrent: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'RM 54.90',
    quality: 'Ultra HD',
    resolution: '4K+HDR',
    downloads: true,
    screens: 4,
    isCurrent: true,
  },
] as const


function PlanModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string>('premium')

  return (
    <div className="planModalOverlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Change Plan">
      <div className="planModal" onClick={(e) => e.stopPropagation()}>
        <div className="planModalHeader">
          <h2 className="planModalTitle">Change Plan</h2>
          <button className="planModalClose" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="planCardsInner">
          {PLANS.map((p) => {
            const isSelected = selected === p.id
            return (
              <label key={p.id} className={`planCard ${isSelected ? 'isSelected' : ''}`}>
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={isSelected}
                  onChange={() => setSelected(p.id)}
                  className="srOnly"
                />
                <div className="planCardHeader">
                  {p.isCurrent && <div className="planCardBadge">CURRENT PLAN</div>}
                  {isSelected && <div className="planCardSelectedBadge">✓</div>}
                  <h3 className="planCardName">{p.name.replace('\n', ' ')}</h3>
                  <div className="planCardQuality">{p.resolution}</div>
                </div>
                <div className="planCardBody">
                  <div className="planCardPrice">
                    {p.price} <span>/month</span>
                  </div>
                  <ul className="planCardFeatures">
                    <li>
                      <span>Video Quality</span>
                      <strong>{p.quality}</strong>
                    </li>
                    <li>
                      <span>Resolution</span>
                      <strong>{p.resolution}</strong>
                    </li>
                    <li>
                      <span>Spatial Audio (immersive sound)</span>
                      <strong>{p.id === 'premium' ? 'Included' : '—'}</strong>
                    </li>
                    <li>
                      <span>Supported devices</span>
                      <strong>TV, computer, mobile phone, tablet</strong>
                    </li>
                    <li>
                      <span>Devices your household can watch at the same time</span>
                      <strong>{p.screens}</strong>
                    </li>
                    <li>
                      <span>Download devices</span>
                      <strong>{p.downloads ? p.screens : 0}</strong>
                    </li>
                    <li>
                      <span>Ads</span>
                      <strong>{p.id === 'standard-ads' ? 'Yes' : 'No ads'}</strong>
                    </li>
                  </ul>
                </div>
              </label>
            )
          })}
        </div>

        <div className="planCta">
          <button className="planCtaCancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="planCtaConfirm"
            onClick={onClose}
            disabled={selected === 'premium'}
          >
            {selected === 'premium' ? 'Current Plan' : 'Change Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function AccountPage({ currentProfileId }: Props) {
  const [showPlanModal, setShowPlanModal] = useState(false)

  return (
    <div className="accountPage">
      <header className="accountHeader">
        <div className="accountHeaderInner">
          <button className="landingBrand" onClick={() => navigate(routes.browse)} aria-label="Home">
            <NetflixLogo className="nfLogo" />
          </button>
          <div className="accountHeaderProfile">
            <img
              src={defaultProfiles.find((p) => p.id === currentProfileId)?.avatarUrl || defaultProfiles[0].avatarUrl}
              alt=""
              className="accountHeaderAvatar"
            />
          </div>
        </div>
      </header>

      <main className="accountMain">
        <div className="accountContainer">
          <div className="accountTitleRow">
            <h1 className="accountTitle">Account</h1>
            <div className="accountMemberSince">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Member Since March 2020
            </div>
          </div>

          <section className="accountSection">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Membership &amp; Billing</h2>
              <button className="accountCancelButton">Cancel Membership</button>
            </div>
            <div className="accountSectionRight">
              <div className="accountBlock">
                <div className="accountRow">
                  <span className="accountStrong">user@example.com</span>
                  <a href="#" className="accountLink">Change account email</a>
                </div>
                <div className="accountRow">
                  <span className="accountLight">Password: ••••••••</span>
                  <a href="#" className="accountLink">Change password</a>
                </div>
                <div className="accountRow">
                  <span className="accountLight">Phone: +1 (555) 123-4567</span>
                  <a href="#" className="accountLink">Change phone number</a>
                </div>
              </div>
              <div className="accountBlock">
                <div className="accountRow">
                  <span className="accountStrong">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    •••• •••• •••• 1234
                  </span>
                  <a href="#" className="accountLink">Manage payment info</a>
                </div>
                <div className="accountRow">
                  <span className="accountLight">Your next billing date is April 1, 2025.</span>
                  <a href="#" className="accountLink">Add backup payment method</a>
                </div>
                <div className="accountRow">
                  <a href="#" className="accountLink">Billing details</a>
                </div>
              </div>
            </div>
          </section>

          <section className="accountSection">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Plan Details</h2>
            </div>
            <div className="accountSectionRight">
              <div className="accountRow">
                <span className="accountStrong">
                  Premium <span className="accountBadge">ULTRA HD</span>
                </span>
                <button
                  className="accountLink"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={() => setShowPlanModal(true)}
                >
                  Change plan
                </button>
              </div>
            </div>
          </section>

          <section className="accountSection accountSectionLast">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Profile &amp; Parental Controls</h2>
            </div>
            <div className="accountSectionRight">
              {defaultProfiles.map((p) => (
                <div key={p.id} className="accountProfileRow">
                  <div className="accountProfileInfo">
                    <img src={p.avatarUrl} alt="" className="accountProfileAvatar" />
                    <div>
                      <div className="accountStrong">{p.name}</div>
                      <div className="accountLight">All Maturity Ratings</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="accountFooter">
        <div className="accountFooterInner">
          <div className="accountFooterQuestions">Questions? Call 1-844-505-2993</div>
          <div className="accountFooterGrid">
            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
          </div>
        </div>
      </footer>

      {showPlanModal && <PlanModal onClose={() => setShowPlanModal(false)} />}
    </div>
  )
}
