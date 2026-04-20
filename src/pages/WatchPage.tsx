import { useMemo } from 'react'
import { VideoPlayer } from '@/components/VideoPlayer'
import { getMovie, movies } from '@/data/catalog'
import { getWatchMovieId, navigate, routes } from '@/lib/router'

type Props = {
  profile: { id: string; name: string }
}

export function WatchPage(_: Props) {
  const movieId = getWatchMovieId()
  const movie = useMemo(() => (movieId ? getMovie(movieId) : null), [movieId])
  const fallback = movies[0]
  const m = movie ?? fallback

  return (
    <div className="watch">
      <VideoPlayer
        src={m.videoUrl}
        poster={m.backdropUrl}
        title={m.title}
        onExit={() => navigate(routes.browse)}
      />
    </div>
  )
}

