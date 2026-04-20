import { getMovieBySlug, slugify, movies } from '@/data/catalog'

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
  if (pathname.startsWith(routes.watch)) {
    const slug = pathname.slice(routes.watch.length).replace(/^\//, '')
    const movie = slug ? getMovieBySlug(slug) : null
    return { name: 'watch', movieId: movie?.id ?? null }
  }
  return { name: 'home' }
}

/** Build a human-readable watch URL like /watch/stranger-things */
export function buildWatchUrl(movieId: string) {
  const movie = movies.find((m) => m.id === movieId)
  if (!movie) return `${routes.watch}/${movieId}`
  return `${routes.watch}/${slugify(movie.title)}`
}

/** Resolve the current /watch/<slug> path back to a movie ID */
export function getWatchMovieId() {
  const pathname = window.location.pathname
  const slug = pathname.startsWith(routes.watch)
    ? pathname.slice(routes.watch.length).replace(/^\//, '')
    : null
  if (!slug) return null
  return getMovieBySlug(slug)?.id ?? null
}
