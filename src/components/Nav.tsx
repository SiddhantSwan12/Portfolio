"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { profile } from "@/lib/content";
import { CommandPalette } from "./CommandPalette";
import { CurrentTime, ThemeToggle } from "./ThemeControls";
import { NavPlayButton } from "./AudioPlayer";
import { MenuIcon, SearchIcon } from "./icons";

const LINKS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "open-source", label: "Activity" },
  { id: "skills", label: "Skills" },
];

// Header controls: compact for a mouse, 44px where the pointer is a finger.
const CONTROL =
  "rounded-lg border border-border-subtle bg-surface-container-lowest font-mono text-xs text-text-muted transition-colors hover:border-outline hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline pointer-coarse:min-h-11 pointer-coarse:min-w-11";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline";

// The shortcut badge names the key the visitor actually has. The server renders ⌘K and the
// client corrects it on hydration, which is why this is a store rather than an effect.
const subscribeNever = () => () => {};
const isApple = () => /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const useShortcutLabel = () =>
  useSyncExternalStore(subscribeNever, () => (isApple() ? "⌘K" : "Ctrl K"), () => "⌘K");

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteOpener = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const shortcut = useShortcutLabel();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Safari does not focus a button on click, so the menu button names itself as the opener.
  const openPalette = useCallback((opener?: HTMLElement | null) => {
    paletteOpener.current =
      opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setPaletteOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    paletteOpener.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, openPalette, closePalette]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border-subtle bg-surface/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-container items-center justify-between gap-3 px-4 md:px-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`flex min-h-11 min-w-0 items-center gap-2 text-primary transition-transform active:scale-95 ${FOCUS}`}
          >
            <span className="grid size-7 place-items-center rounded border border-border-subtle bg-surface-container-lowest font-mono text-xs">
              {"</>"}
            </span>
            <span className="truncate font-mono text-sm font-medium tracking-tight">{profile.handle}</span>
          </button>

          {/* Real anchors: the URL, history and middle-click all work. */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`inline-flex min-h-9 items-center rounded-lg px-3 font-mono text-xs text-text-muted transition-colors hover:bg-surface-container-low hover:text-on-surface ${FOCUS}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <CurrentTime className="hidden rounded-lg border border-border-subtle bg-surface-container-lowest px-2.5 py-2 text-xs sm:block" />
            <NavPlayButton />
            <ThemeToggle />
            {/* One button, two jobs: the site menu on a phone, search on a desk. */}
            <button
              ref={menuRef}
              onClick={() => openPalette(menuRef.current)}
              aria-label="Menu and search"
              aria-haspopup="dialog"
              aria-expanded={paletteOpen}
              className={`flex h-9 w-9 items-center justify-center gap-2 sm:w-auto sm:px-2.5 ${CONTROL}`}
            >
              <MenuIcon className="sm:hidden" />
              <span className="hidden items-center gap-2 sm:flex">
                <SearchIcon />
                <span>Search</span>
                <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 text-[10px] text-on-surface-variant pointer-coarse:hidden">
                  {shortcut}
                </kbd>
              </span>
            </button>
            {/* Below md the résumé lives in the phone action bar instead. */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden min-h-9 items-center rounded-lg bg-primary px-4 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95 md:inline-flex pointer-coarse:min-h-11 ${FOCUS}`}
            >
              Résumé
            </a>
          </div>
        </nav>
      </header>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}
