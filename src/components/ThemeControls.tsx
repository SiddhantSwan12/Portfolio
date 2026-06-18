"use client";

import { useEffect, useState, useSyncExternalStore, type MouseEvent } from "react";
import { playSwitchSound } from "@/lib/sound";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function CurrentTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--.--.--");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now
          .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replaceAll(":", "."),
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      dateTime={time.replaceAll(".", ":")}
      className={`font-mono tabular-nums text-on-surface-variant ${className}`}
      aria-label="Current time"
    >
      {time}
    </time>
  );
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getInitialTheme, () => "dark");

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    playSwitchSound();
    const next = theme === "dark" ? "light" : "dark";
    document.querySelectorAll(".theme-pixel-wipe, .theme-switch-wipe").forEach((node) => node.remove());
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Match the background grid cell size (284×112px) so tiles overlap perfectly
    const GRID_W = 284;
    const GRID_H = 112;

    // Background grid is centered (background-position: center top),
    // so compute the horizontal offset to align the wipe grid to it.
    const offsetX = (((window.innerWidth - GRID_W) / 2) % GRID_W + GRID_W) % GRID_W;
    const cols = Math.ceil((window.innerWidth + offsetX) / GRID_W) + 1;
    const rows = Math.ceil(window.innerHeight / GRID_H) + 1;

    const wipe = document.createElement("span");
    wipe.className = "theme-pixel-wipe";
    wipe.style.setProperty("--pixel-bg", next === "light" ? "#ffffff" : "#131316");
    wipe.style.setProperty("--grid-cols", `${cols}`);
    wipe.style.setProperty("--grid-rows", `${rows}`);
    wipe.style.setProperty("--cell-w", `${GRID_W}px`);
    wipe.style.setProperty("--cell-h", `${GRID_H}px`);
    wipe.style.setProperty("--offset-x", `-${GRID_W - offsetX}px`);

    const SPREAD = 150;
    // white -> dark converges into the button; dark -> white emanates outward.
    const inward = next === "dark";
    const tiles: { node: HTMLSpanElement; distance: number }[] = [];
    let maxDistance = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const tile = document.createElement("span");
        const tileX = col * GRID_W + offsetX - (GRID_W - offsetX);
        const tileY = row * GRID_H;
        const tileCenterX = tileX + GRID_W / 2;
        const tileCenterY = tileY + GRID_H / 2;
        const distance = Math.hypot(tileCenterX - originX, tileCenterY - originY);
        if (distance > maxDistance) maxDistance = distance;
        tiles.push({ node: tile, distance });
        wipe.appendChild(tile);
      }
    }

    for (const { node, distance } of tiles) {
      const normalized = maxDistance > 0 ? distance / maxDistance : 0;
      const factor = inward ? 1 - normalized : normalized;
      node.style.setProperty("--delay", `${Math.round(factor * SPREAD)}ms`);
    }

    document.body.appendChild(wipe);

    // Outward covers the button first (swap early); inward covers it last (swap late).
    window.setTimeout(
      () => {
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem("theme", next);
        window.dispatchEvent(new Event("theme-change"));
      },
      inward ? SPREAD + 140 : 110,
    );

    window.setTimeout(() => wipe.remove(), 820);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative grid size-9 place-items-center rounded-lg border border-border-subtle bg-surface-container-lowest text-primary transition-colors hover:border-outline active:scale-95"
    >
      <span
        className={`absolute size-4 rounded-full border border-current transition-all duration-300 ${
          theme === "dark" ? "translate-x-0 bg-primary" : "-translate-x-1.5 bg-transparent"
        }`}
      />
      <span
        className={`absolute size-1 rounded-full bg-current transition-all duration-300 ${
          theme === "dark" ? "translate-x-1.5 opacity-0" : "translate-x-2 opacity-100"
        }`}
      />
      <span className="sr-only">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
