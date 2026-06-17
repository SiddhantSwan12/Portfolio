"use client";

import { useEffect, useState, useSyncExternalStore, type MouseEvent } from "react";

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
    const next = theme === "dark" ? "light" : "dark";
    document.querySelectorAll(".theme-pixel-wipe, .theme-switch-wipe").forEach((node) => node.remove());
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const cols = 22;
    const rows = 14;
    const wipe = document.createElement("span");
    wipe.className = "theme-pixel-wipe";
    wipe.style.setProperty("--pixel-bg", next === "light" ? "#ffffff" : "#131316");

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const tile = document.createElement("span");
        const tileX = ((col + 0.5) / cols) * window.innerWidth;
        const tileY = ((row + 0.5) / rows) * window.innerHeight;
        const distance = Math.hypot(tileX - originX, tileY - originY);
        const normalized = distance / Math.hypot(window.innerWidth, window.innerHeight);
        tile.style.setProperty("--delay", `${Math.round(normalized * 280)}ms`);
        wipe.appendChild(tile);
      }
    }

    document.body.appendChild(wipe);

    window.setTimeout(() => {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      window.dispatchEvent(new Event("theme-change"));
    }, 180);

    window.setTimeout(() => wipe.remove(), 1300);
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
