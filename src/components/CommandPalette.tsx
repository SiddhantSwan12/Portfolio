"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { socials } from "@/lib/content";

export type Command = { label: string; hint: string; shortcut?: string; run: () => void };

const SECTIONS = [
  { id: "about", label: "About", key: "1" },
  { id: "experience", label: "Experience", key: "2" },
  { id: "projects", label: "Projects", key: "3" },
  { id: "open-source", label: "Open Source", key: "4" },
  { id: "skills", label: "Skills", key: "5" },
  { id: "education", label: "Education", key: "6" },
  { id: "writing", label: "Writing", key: "7" },
];

/** Global keyboard shortcuts — works even when the palette is closed */
export function useGlobalShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const section = SECTIONS.find((s) => s.key === e.key);
      if (section) {
        e.preventDefault();
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // T = scroll to top
      if (e.key === "t") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && <PaletteDialog onClose={onClose} />}
    </AnimatePresence>
  );
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  const commands = useMemo<Command[]>(() => {
    const nav = SECTIONS.map((s) => ({
      label: `Go to ${s.label}`,
      hint: "Section",
      shortcut: s.key,
      run: () => go(s.id),
    }));
    const links = socials.map((s) => ({
      label: s.label,
      hint: "Open link",
      run: () => {
        window.open(s.href, "_blank", "noopener,noreferrer");
        onClose();
      },
    }));
    const actions: Command[] = [
      {
        label: "Scroll to top",
        hint: "Action",
        shortcut: "T",
        run: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onClose();
        },
      },
      {
        label: "Toggle music",
        hint: "Action",
        shortcut: "M",
        run: () => {
          window.dispatchEvent(new Event("toggle-music"));
          onClose();
        },
      },
      {
        label: "Toggle theme",
        hint: "Action",
        run: () => {
          // Simulate a click on the theme toggle button
          const btn = document.querySelector<HTMLButtonElement>('[aria-label*="Switch to"]');
          btn?.click();
          onClose();
        },
      },
      {
        label: "Copy email",
        hint: "swansiddhant9@gmail.com",
        run: () => {
          navigator.clipboard?.writeText("swansiddhant9@gmail.com");
          onClose();
        },
      },
    ];
    return [...nav, ...actions, ...links];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + c.hint).toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, active, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest shadow-2xl shadow-black/50"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Search input */}
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Jump to a section or link…"
          className="w-full border-b border-border-subtle bg-transparent px-4 py-3.5 font-mono text-sm text-on-surface placeholder:text-text-muted outline-none"
        />

        {/* Shortcut legend */}
        <div className="flex flex-wrap gap-2 border-b border-border-subtle px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Shortcuts:</span>
          {SECTIONS.map((s) => (
            <span key={s.key} className="flex items-center gap-1">
              <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
                {s.key}
              </kbd>
              <span className="font-mono text-[10px] text-text-muted">{s.label}</span>
            </span>
          ))}
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
              M
            </kbd>
            <span className="font-mono text-[10px] text-text-muted">Music</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
              T
            </kbd>
            <span className="font-mono text-[10px] text-text-muted">Top</span>
          </span>
        </div>

        {/* Results */}
        <ul className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-xs text-text-muted">No matches</li>
          )}
          {filtered.map((c, i) => (
            <li key={c.label}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => c.run()}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-surface-container-high" : "hover:bg-surface-container-low"
                }`}
              >
                <span className="text-sm text-on-surface">{c.label}</span>
                <span className="flex items-center gap-2">
                  {c.shortcut && (
                    <kbd className="rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
                      {c.shortcut}
                    </kbd>
                  )}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {c.hint}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
