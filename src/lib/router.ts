export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  profiles: '/profiles',
  editProfile: '/edit-profile',
  browse: '/browse',
  myList: '/my-list',
  watch: '/watch',
  account: '/account',
} as const

export type AppRouteName = keyof typeof routes

export type AppRoute =
  | { name: 'home' }
  | { name: 'login' }
  | { name: 'signup' }
  | { name: 'profiles' }
  | { name: 'editProfile' }
  | { name: 'browse' }
  | { name: 'myList' }
  | { name: 'account' }
  | { name: 'watch'; movieId: string | null }

export function navigate(to: string, opts?: { replace?: boolean }) {
  const replace = opts?.replace ?? false
  if (replace) window.history.replaceState({}, '', to)
  else window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function getRouteFromLocation(path: string): AppRoute {
  const url = new URL(path || '/', window.location.origin)
  const pathname = url.pathname || '/'
  if (pathname === routes.login) return { name: 'login' }
  if (pathname === routes.signup) return { name: 'signup' }
  if (pathname === routes.profiles) return { name: 'profiles' }
  if (pathname === routes.editProfile) return { name: 'editProfile' }
  if (pathname === routes.browse) return { name: 'browse' }
  if (pathname === routes.myList) return { name: 'myList' }
  if (pathname === routes.account) return { name: 'account' }
  if (pathname === routes.watch)
    return { name: 'watch', movieId: url.searchParams.get('v') }
  return { name: 'home' }
}

export function buildWatchUrl(movieId: string) {
  return `${routes.watch}?v=${encodeURIComponent(movieId)}`
}

export function getWatchMovieId() {
  const params = new URLSearchParams(window.location.search)
  return params.get('v')
}
