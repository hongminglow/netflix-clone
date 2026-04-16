import { NetflixLogo } from '../components/NetflixLogo'
import { defaultProfiles } from '../data/profiles'
import { navigate, routes } from '../lib/router'

type Props = {
  currentProfileId: string
}

export function AccountPage({ currentProfileId }: Props) {
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
              <h2 className="accountSectionTitle">Membership & Billing</h2>
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
                <span className="accountStrong">Premium <span className="accountBadge">ULTRA HD</span></span>
                <a href="#" className="accountLink">Change plan</a>
              </div>
            </div>
          </section>

          <section className="accountSection accountSectionLast">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Profile & Parental Controls</h2>
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
    </div>
  )
}
