import { NetflixLogo } from '../components/NetflixLogo'
import { defaultProfiles } from '../data/profiles'
import { navigate, routes } from '../lib/router'

export function EditProfilePage() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const profile = defaultProfiles.find((p) => p.id === id) || defaultProfiles[0]

  return (
    <div className="editProfile">
      <header className="profilesTopBar">
        <button className="landingBrand" onClick={() => navigate(routes.home)} aria-label="Home">
          <NetflixLogo className="nfLogo" />
        </button>
      </header>

      <main className="editProfileMain">
        <div className="editProfileContainer">
          <h1 className="editProfileTitle">Edit Profile</h1>
          <div className="editProfileContent">
            <div className="editProfileLeft">
              <div className="profileAvatarWrapper">
                <img className="profileAvatar" src={profile.avatarUrl} alt="" />
              </div>
            </div>
            <div className="editProfileRight">
              <input className="editProfileNameInput" type="text" defaultValue={profile.name} />
              
              <div className="editProfileSection">
                <h3 className="editProfileLabel">Language:</h3>
                <select className="editProfileSelect" defaultValue="en">
                  <option value="en">English</option>
                  <option value="bm">Bahasa Melayu</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div className="editProfileSection">
                <h3 className="editProfileLabel">Maturity Settings:</h3>
                <div className="editProfileMaturityTag">All Maturity Ratings</div>
                <p className="editProfileHint">Show titles of all maturity ratings for this profile.</p>
                <button className="editProfileEditButton">Edit</button>
              </div>

              <div className="editProfileSection">
                <h3 className="editProfileLabel">Autoplay controls</h3>
                <label className="editProfileCheckbox">
                  <input type="checkbox" defaultChecked />
                  <span>Autoplay next episode in a series on all devices.</span>
                </label>
                <label className="editProfileCheckbox">
                  <input type="checkbox" defaultChecked />
                  <span>Autoplay previews while browsing on all devices.</span>
                </label>
              </div>
            </div>
          </div>
          <div className="editProfileActions">
            <button className="editProfileSave" onClick={() => navigate(routes.profiles)}>Save</button>
            <button className="editProfileCancel" onClick={() => navigate(routes.profiles)}>Cancel</button>
          </div>
        </div>
      </main>
    </div>
  )
}
