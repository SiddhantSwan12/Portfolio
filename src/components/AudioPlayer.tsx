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
 */
export function NavPlayButton() {
  const { playing, ready, toggle } = useAudioPlayer();

  // Keyboard shortcut: M to toggle music
  // Also listen for 'toggle-music' event from CommandPalette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        toggle();
      }
    };
    const onToggleEvent = () => toggle();

    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-music", onToggleEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-music", onToggleEvent);
    };
  }, [toggle]);

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-label={playing ? "Pause lofi music" : "Play lofi music"}
      title={`${playing ? "Pause" : "Play"} lofi · press M`}
      className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-container-lowest px-2.5 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-outline hover:text-on-surface active:scale-95 disabled:opacity-40"
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

      <span>{playing ? "Lofi" : "Play"}</span>

      <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 text-[10px] text-on-surface-variant">
        M
      </kbd>

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
