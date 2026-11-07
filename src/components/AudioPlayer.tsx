"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Headless lofi audio controller — audio element + state.
 * The UI lives in Nav.tsx via the NavPlayButton export.
 */
let globalAudio: HTMLAudioElement | null = null;
const globalListeners: Set<() => void> = new Set();

function notifyListeners() {
  globalListeners.forEach((fn) => fn());
}

function getAudio(): HTMLAudioElement {
  if (!globalAudio) {
    globalAudio = new Audio("/lofi.mp3");
    globalAudio.loop = true;
    globalAudio.volume = 0.4;
    globalAudio.preload = "metadata";
  }
  return globalAudio;
}

export function useAudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = getAudio();

    const onCanPlay = () => setReady(true);
    const onPlay = () => { setPlaying(true); notifyListeners(); };
    const onPause = () => { setPlaying(false); notifyListeners(); };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    if (audio.readyState >= 4) window.setTimeout(onCanPlay, 0);

    const syncState = () => setPlaying(!audio.paused);
    globalListeners.add(syncState);

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      globalListeners.delete(syncState);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  return { playing, ready, toggle };
}

/**
 * Compact play/pause button for the Nav bar.
 * Below md it stays out of the header until music is playing, so a phone always has a
 * one-tap pause; starting playback there happens from the menu ("Play lofi").
 * Playback is never gated on `ready`: iOS does not preload, so a gesture must be allowed to start it.
 */
export function NavPlayButton() {
  const { playing, toggle } = useAudioPlayer();

  // The menu's "Play lofi" / "Pause lofi" entry drives this button through a window event.
  useEffect(() => {
    const onToggleEvent = () => toggle();
    window.addEventListener("toggle-music", onToggleEvent);
    return () => window.removeEventListener("toggle-music", onToggleEvent);
  }, [toggle]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause lofi music" : "Play lofi music"}
      title={`${playing ? "Pause" : "Play"} lofi`}
      className={`${
        playing ? "flex" : "hidden md:flex"
      } min-h-9 items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-container-lowest px-2.5 font-mono text-xs text-text-muted transition-all hover:border-outline hover:text-on-surface active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline pointer-coarse:min-h-11 pointer-coarse:min-w-11`}
    >
      {/* Mini equalizer */}
      <span className="flex items-end gap-[2px] h-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2.5px] rounded-full bg-current transition-all duration-300"
            style={{
              height: playing ? undefined : "3px",
              animation: playing
                ? `eq-bar 1.${2 + i}s ease-in-out ${i * 0.15}s infinite alternate`
                : "none",
            }}
          />
        ))}
      </span>

      <span className="hidden md:inline">{playing ? "Lofi" : "Play"}</span>

      {/* Inline keyframes */}
      <style jsx global>{`
        @keyframes eq-bar {
          0% { height: 3px; }
          25% { height: 8px; }
          50% { height: 5px; }
          75% { height: 11px; }
          100% { height: 6px; }
        }
      `}</style>
    </button>
  );
}
