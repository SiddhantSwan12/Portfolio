"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { CommandPalette } from "./CommandPalette";
import { CurrentTime, ThemeToggle } from "./ThemeControls";

const LINKS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

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
            className="flex min-w-0 items-center gap-2 text-primary transition-transform active:scale-95"
          >
            <span className="grid size-7 place-items-center rounded border border-border-subtle bg-surface-container-lowest font-mono text-xs">
              {"</>"}
            </span>
            <span className="truncate font-mono text-sm font-medium tracking-tight">{profile.handle}</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => jump(l.id)}
                className="rounded-lg px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:bg-surface-container-low hover:text-on-surface"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <CurrentTime className="hidden rounded-lg border border-border-subtle bg-surface-container-lowest px-2.5 py-2 text-xs sm:block" />
            <ThemeToggle />
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-lg border border-border-subtle bg-surface-container-lowest px-2.5 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-outline sm:flex"
            >
              <span>Search</span>
              <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 text-[10px] text-on-surface-variant">
                ⌘K
              </kbd>
            </button>
            <a
              href={profile.resumeUrl}
              className="rounded-lg bg-primary px-4 py-2 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
