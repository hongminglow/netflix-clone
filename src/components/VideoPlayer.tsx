import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n";

type Props = {
  src: string;
  poster?: string;
  title?: string;
  onExit?: () => void;
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

const FALLBACK_TIMELINE_SECONDS = 90 * 60;

export function VideoPlayer({ src, poster, title, onExit }: Props) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [virtualProgress, setVirtualProgress] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [scrubValue, setScrubValue] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [previewPct, setPreviewPct] = useState<number | null>(null);
  const [captionsOn, setCaptionsOn] = useState(false);

  const liveDuration = videoRef.current?.duration;
  const hasRealDuration =
    (Number.isFinite(liveDuration) && (liveDuration ?? 0) > 0) || duration > 0;
  const activeDuration = (() => {
    if (Number.isFinite(liveDuration) && (liveDuration ?? 0) > 0) {
      return liveDuration as number;
    }
    if (duration > 0) return duration;
    return FALLBACK_TIMELINE_SECONDS;
  })();

  const progress = useMemo(() => {
    if (!activeDuration) return 0;
    if (!hasRealDuration) return virtualProgress;
    return clamp(time / activeDuration, 0, 1);
  }, [activeDuration, hasRealDuration, time, virtualProgress]);

  const displayedProgress =
    seeking && scrubValue !== null ? scrubValue : progress;
  const displayedTime =
    seeking && scrubValue !== null
      ? scrubValue * activeDuration
      : hasRealDuration
        ? time
        : virtualProgress * activeDuration;

  const progressFill = Math.round(displayedProgress * 100);
  const volumeFill = Math.round((muted ? 0 : volume) * 100);
  const previewTime =
    previewPct === null ? null : formatTime(activeDuration * previewPct);
  const progressTrack = useMemo(
    () =>
      `linear-gradient(90deg, #e50914 0%, #e50914 ${progressFill}%, rgba(255,255,255,0.28) ${progressFill}%, rgba(255,255,255,0.28) 100%)`,
    [progressFill],
  );
  const volumeTrack = useMemo(
    () =>
      `linear-gradient(90deg, #ffffff 0%, #ffffff ${volumeFill}%, rgba(255,255,255,0.26) ${volumeFill}%, rgba(255,255,255,0.26) 100%)`,
    [volumeFill],
  );

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) await v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const setVol = (next: number) => {
    const v = videoRef.current;
    if (!v) return;
    const vv = clamp(next, 0, 1);
    v.volume = vv;
    setVolume(vv);
    if (vv > 0 && v.muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  const seekTo = (pct: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    v.currentTime = clamp(pct, 0, 1) * v.duration;
  };

  const commitSeek = (pct: number) => {
    const nextPct = clamp(pct, 0, 1);
    const total = activeDuration;
    setScrubValue(nextPct);
    setVirtualProgress(nextPct);
    setTime(nextPct * total);
    if (hasRealDuration) {
      seekTo(nextPct);
    }
  };

  const startSeek = () => {
    setSeeking(true);
    setHovering(true);
    setScrubValue(progress);
  };

  const finishSeek = () => {
    const v = videoRef.current;
    if (hasRealDuration && v && Number.isFinite(v.currentTime)) {
      setTime(v.currentTime);
    } else if (scrubValue !== null) {
      setVirtualProgress(scrubValue);
      setTime(scrubValue * activeDuration);
    }
    setSeeking(false);
    setScrubValue(null);
  };

  const skipBy = (seconds: number) => {
    const v = videoRef.current;
    const total = activeDuration;
    const baseTime = hasRealDuration && v ? v.currentTime : virtualProgress * total;
    const nextTime = clamp(baseTime + seconds, 0, total || 0);
    if (hasRealDuration && v) {
      v.currentTime = nextTime;
    } else if (total > 0) {
      setVirtualProgress(nextTime / total);
    }
    setTime(nextTime);
  };

  const requestFullscreen = async () => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.requestFullscreen();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setReady(true);
      setDuration(Number.isFinite(v.duration) ? v.duration : 0);
    };
    const onDuration = () => {
      setDuration(Number.isFinite(v.duration) ? v.duration : 0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (seeking) return;
      setTime(v.currentTime);
    };
    const onVol = () => {
      setMuted(v.muted);
      setVolume(v.volume);
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("durationchange", onDuration);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("volumechange", onVol);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("durationchange", onDuration);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("volumechange", onVol);
    };
  }, [seeking]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let t: number | null = null;
    const show = () => {
      setHovering(true);
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setHovering(false), 3500);
    };

    const onMove = () => show();
    const onKey = (e: KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
        show();
      }
      if (e.key === "f") {
        requestFullscreen();
        show();
      }
      if (e.key === "m") {
        toggleMute();
        show();
      }
      if (e.key === "ArrowLeft") {
        v.currentTime = Math.max(0, v.currentTime - 10);
        show();
      }
      if (e.key === "ArrowRight") {
        v.currentTime = Math.min(v.duration || 0, v.currentTime + 10);
        show();
      }
      if (e.key === "Escape" && onExit) onExit();
    };

    // Notice we do NOT show() on mount here automatically
    root.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    return () => {
      if (t) window.clearTimeout(t);
      root.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [onExit]);

  useEffect(() => {
    if (!seeking) return;

    const onPointerUp = () => finishSeek();

    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    window.addEventListener("touchcancel", onPointerUp);

    return () => {
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onPointerUp);
    };
  }, [seeking]);

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

      <div className={`playerHud ${hovering || seeking ? "isVisible" : ""}`}>
        <div className="playerTop">
          {onExit && (
            <button className="playerBack" onClick={onExit} aria-label="Back">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15.3 5.3 8.6 12l6.7 6.7-1.4 1.4L5.8 12l8.1-8.1 1.4 1.4Z"
                  fill="currentColor"
                />
              </svg>
              <span>{t("player_back")}</span>
            </button>
          )}
          <div className="playerTitle">{title}</div>
        </div>

        <div className="playerBottom">
          <div className="playerProgress">
            <div
              className="playerSeekRail"
              onMouseLeave={() => setPreviewPct(null)}
            >
              {previewTime && (
                <div
                  className="playerPreviewBubble"
                  style={{ left: `${(previewPct ?? 0) * 100}%` }}
                >
                  {previewTime}
                </div>
              )}
              <input
                aria-label="Seek"
                className="playerSlider playerSliderSeek"
                type="range"
                min={0}
                max={1000}
                value={Math.round(displayedProgress * 1000)}
                style={{ background: progressTrack }}
                onMouseDown={startSeek}
                onMouseUp={finishSeek}
                onTouchStart={startSeek}
                onTouchEnd={finishSeek}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (!rect.width) return;
                  setPreviewPct(
                    clamp((e.clientX - rect.left) / rect.width, 0, 1),
                  );
                }}
                onFocus={() => setPreviewPct(displayedProgress)}
                onBlur={() => setPreviewPct(null)}
                onChange={(e) => {
                  const pct = Number(e.target.value) / 1000;
                  commitSeek(pct);
                }}
                onInput={(e) => {
                  const pct = Number(e.currentTarget.value) / 1000;
                  commitSeek(pct);
                  setPreviewPct(pct);
                }}
              />
            </div>
            <div className="playerTime">
              {formatTime(displayedTime)} / {formatTime(activeDuration)}
            </div>
          </div>

          <div className="playerControls">
            <div className="playerControlsLeft">
              <button
                className="playerIcon playerIconPrimary"
                onClick={togglePlay}
                aria-label="Play"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 6h4v12H7V6Zm6 0h4v12h-4V6Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l12-7L8 5Z" fill="currentColor" />
                  </svg>
                )}
              </button>

              <button
                className="playerIcon playerQuickAction"
                onClick={() => skipBy(-10)}
                aria-label="Rewind 10 seconds"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m11 18-8-6 8-6v12Zm10 0-8-6 8-6v12Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="playerQuickLabel">10</span>
              </button>

              <button
                className="playerIcon playerQuickAction"
                onClick={() => skipBy(10)}
                aria-label="Forward 10 seconds"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m3 18 8-6-8-6v12Zm10 0 8-6-8-6v12Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="playerQuickLabel">10</span>
              </button>

              <button
                className="playerIcon"
                onClick={toggleMute}
                aria-label="Mute"
              >
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

              <div className="playerVolumeShell">
                <div className="playerVolume">
                  <input
                    aria-label="Volume"
                    className="playerSlider playerSliderVolume"
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(volume * 100)}
                    style={{ background: volumeTrack }}
                    onChange={(e) => setVol(Number(e.target.value) / 100)}
                  />
                </div>
                <span className="playerVolumeValue">{volumeFill}%</span>
              </div>
            </div>

            <div className="playerControlsRight">
              <div className="playerMetaGroup" aria-hidden="true">
                <span className="playerMetaBadge">S1:E1</span>
                <span className="playerQualityBadge">HD</span>
              </div>
              <button
                className={`playerIcon playerQuickAction ${captionsOn ? "isActive" : ""}`}
                onClick={() => setCaptionsOn((value) => !value)}
                aria-label="Audio and subtitles"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 6h16v10H8l-4 4V6Zm4 4h8M8 13h5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
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

      {!ready && <div className="playerLoading">{t("player_loading")}</div>}
    </div>
  );
}
