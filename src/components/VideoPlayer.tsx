import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../i18n'

type Props = {
  src: string
  poster?: string
  title?: string
  onExit?: () => void
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const s = Math.floor(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const ss = String(s % 60).padStart(2, '0')
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${ss}`
  return `${m}:${ss}`
}

export function VideoPlayer({ src, poster, title, onExit }: Props) {
  const { t } = useI18n()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const progress = useMemo(() => {
    if (!duration) return 0
    return clamp(time / duration, 0, 1)
  }, [duration, time])

  const togglePlay = async () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) await v.play()
    else v.pause()
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const setVol = (next: number) => {
    const v = videoRef.current
    if (!v) return
    const vv = clamp(next, 0, 1)
    v.volume = vv
    setVolume(vv)
    if (vv > 0 && v.muted) {
      v.muted = false
      setMuted(false)
    }
  }

  const seekTo = (pct: number) => {
    const v = videoRef.current
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return
    v.currentTime = clamp(pct, 0, 1) * v.duration
  }

  const requestFullscreen = async () => {
    const root = rootRef.current
    if (!root) return
    if (document.fullscreenElement) await document.exitFullscreen()
    else await root.requestFullscreen()
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onLoaded = () => {
      setReady(true)
      setDuration(Number.isFinite(v.duration) ? v.duration : 0)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTime = () => {
      if (seeking) return
      setTime(v.currentTime)
    }
    const onVol = () => {
      setMuted(v.muted)
      setVolume(v.volume)
    }

    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('volumechange', onVol)

    return () => {
      v.removeEventListener('loadedmetadata', onLoaded)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('volumechange', onVol)
    }
  }, [seeking])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let t: number | null = null
    const show = () => {
      setHovering(true)
      if (t) window.clearTimeout(t)
      t = window.setTimeout(() => setHovering(false), 2200)
    }

    const onMove = () => show()
    const onKey = (e: KeyboardEvent) => {
      const v = videoRef.current
      if (!v) return
      if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
        show()
      }
      if (e.key === 'f') {
        requestFullscreen()
        show()
      }
      if (e.key === 'm') {
        toggleMute()
        show()
      }
      if (e.key === 'ArrowLeft') {
        v.currentTime = Math.max(0, v.currentTime - 10)
        show()
      }
      if (e.key === 'ArrowRight') {
        v.currentTime = Math.min(v.duration || 0, v.currentTime + 10)
        show()
      }
      if (e.key === 'Escape' && onExit) onExit()
    }

    // Notice we do NOT show() on mount here automatically
    root.addEventListener('mousemove', onMove)
    window.addEventListener('keydown', onKey)
    return () => {
      if (t) window.clearTimeout(t)
      root.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [onExit])

  return (
    <div className="player" ref={rootRef}>
      <video
        ref={videoRef}
        className="playerVideo"
        src={src}
        poster={poster}
        autoPlay
        playsInline
        onClick={togglePlay}
      />

      <div className={`playerHud ${hovering ? 'isVisible' : ''}`}>
        <div className="playerTop" onMouseMove={(e) => e.stopPropagation()}>
          {onExit && (
            <button className="playerBack" onClick={onExit} aria-label="Back">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15.3 5.3 8.6 12l6.7 6.7-1.4 1.4L5.8 12l8.1-8.1 1.4 1.4Z"
                  fill="currentColor"
                />
              </svg>
              <span>{t('player_back')}</span>
            </button>
          )}
          <div className="playerTitle">{title}</div>
        </div>

        <div className="playerBottom" onMouseMove={(e) => e.stopPropagation()}>
          <div className="playerProgress">
            <input
              aria-label="Seek"
              type="range"
              min={0}
              max={1000}
              value={Math.round(progress * 1000)}
              onMouseDown={() => setSeeking(true)}
              onMouseUp={() => setSeeking(false)}
              onTouchStart={() => setSeeking(true)}
              onTouchEnd={() => setSeeking(false)}
              onChange={(e) => {
                const pct = Number(e.target.value) / 1000
                setTime(pct * (duration || 0))
                seekTo(pct)
              }}
            />
            <div className="playerTime">
              {formatTime(time)} / {formatTime(duration)}
            </div>
          </div>

          <div className="playerControls">
            <div className="playerControlsLeft">
              <button className="playerIcon" onClick={togglePlay} aria-label="Play">
                {playing ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 6h4v12H7V6Zm6 0h4v12h-4V6Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l12-7L8 5Z" fill="currentColor" />
                  </svg>
                )}
              </button>

              <button className="playerIcon" onClick={toggleMute} aria-label="Mute">
                {muted || volume === 0 ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 10v4h3l4 4V6L8 10H5Zm12.6 2 2.2 2.2-1.4 1.4L16.2 13l-2.2 2.2-1.4-1.4L14.8 12l-2.2-2.2 1.4-1.4 2.2 2.2 2.2-2.2 1.4 1.4L17.6 12Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 10v4h3l4 4V6L8 10H5Zm10.5 2c0-1.8-1-3.4-2.5-4.2v8.4c1.5-.8 2.5-2.4 2.5-4.2Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>

              <div className="playerVolume">
                <input
                  aria-label="Volume"
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => setVol(Number(e.target.value) / 100)}
                />
              </div>
            </div>

            <div className="playerControlsRight">
              <button
                className="playerIcon"
                onClick={requestFullscreen}
                aria-label="Fullscreen"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 14H5v5h5v-2H7v-3Zm0-4h3V7h3V5H5v5h2Zm10 9h-3v2h5v-5h-2v3Zm0-14V8h-3v2h5V5h-2Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {!ready && <div className="playerLoading">{t('player_loading')}</div>}
    </div>
  )
}
