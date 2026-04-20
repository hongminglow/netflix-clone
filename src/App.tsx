import './App.css'
import { useEffect, useMemo } from 'react'
import { BrowsePage } from '@/pages/BrowsePage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { ProfilesPage } from '@/pages/ProfilesPage'
import { SignupPage } from '@/pages/SignupPage'
import { WatchPage } from '@/pages/WatchPage'
import { AccountPage } from '@/pages/AccountPage'
import { EditProfilePage } from '@/pages/EditProfilePage'
import { useStore } from '@/store'
import { useRoute } from '@/hooks/useRoute'
import { getRouteFromLocation, navigate, routes } from '@/lib/router'

function App() {
  const route = useRoute()
  const { session, setSession } = useStore()

  const authed = !!session.user
  const resolvedRoute = useMemo(() => getRouteFromLocation(route), [route])

  const guards = useMemo(() => {
    const r = resolvedRoute.name
    if (r === 'home') return resolvedRoute

    if (
      !authed &&
      (r === 'browse' || r === 'profiles' || r === 'editProfile' || r === 'myList' || r === 'watch' || r === 'account')
    )
      return { name: 'home' as const }

    if (authed && (r === 'login' || r === 'signup'))
      return { name: 'profiles' as const }

    if (authed && !session.profile && (r === 'browse' || r === 'myList' || r === 'watch' || r === 'account'))
      return { name: 'profiles' as const }

    return resolvedRoute
  }, [authed, resolvedRoute, session.profile])

  useEffect(() => {
    if (guards.name !== resolvedRoute.name)
      navigate(routes[guards.name], { replace: true })
  }, [guards.name, resolvedRoute.name])

  return (
    <div className="appShell">
      {guards.name === 'home' && (
        <LandingPage
          authed={authed}
          onGetStarted={() => navigate(routes.signup)}
        />
      )}
      {guards.name === 'login' && (
        <LoginPage
          onLogin={(user) => setSession((s) => ({ ...s, user, profile: null }))}
        />
      )}
      {guards.name === 'signup' && (
        <SignupPage
          onSignup={(user) => setSession((s) => ({ ...s, user, profile: null }))}
        />
      )}
      {guards.name === 'profiles' && (
        <ProfilesPage
          onSelect={(profile) =>
            setSession((s) => ({ ...s, profile }))
          }
        />
      )}
      {guards.name === 'editProfile' && (
        <EditProfilePage />
      )}
      {guards.name === 'browse' && session.profile && (
        <BrowsePage
          profile={session.profile}
          onSignOut={() => setSession(() => ({ user: null, profile: null }))}
        />
      )}
      {guards.name === 'myList' && session.profile && (
        <BrowsePage
          profile={session.profile}
          onSignOut={() => setSession(() => ({ user: null, profile: null }))}
          view="myList"
        />
      )}
      {guards.name === 'watch' && session.profile && (
        <WatchPage profile={session.profile} />
      )}
      {guards.name === 'account' && session.profile && (
        <AccountPage currentProfileId={session.profile.id} />
      )}
    </div>
  )
}

export default App
