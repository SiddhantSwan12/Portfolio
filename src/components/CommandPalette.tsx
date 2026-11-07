"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, projectId, projects, socials } from "@/lib/content";
import { useAudioPlayer } from "./AudioPlayer";
import { requestContact } from "./ContactComposer";

export type Command = { label: string; hint: string; shortcut?: string; run: () => void };

const SECTIONS = [
  { id: "about", label: "About", key: "1" },
  { id: "projects", label: "Projects", key: "2" },
  { id: "experience", label: "Experience", key: "3" },
  { id: "open-source", label: "GitHub Activity", key: "4" },
  { id: "skills", label: "Skills", key: "5" },
  { id: "education", label: "Education", key: "6" },
];

const KBD =
  "rounded border border-border-subtle bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant";

/** Accent-insensitive matching, so "resume" finds "Open résumé". */
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <PaletteDialog onClose={onClose} />}</AnimatePresence>;
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  // Only ever mounted on the client, after the theme script has run.
  const [theme] = useState<"dark" | "light">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  const { playing } = useAudioPlayer();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // A keyboard user lands in the search box. On a touch screen, focusing it would raise the
  // on-screen keyboard over the menu, so focus parks on the dialog instead.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) dialogRef.current?.focus();
    else inputRef.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(() => {
    const sections = SECTIONS.map((s) => ({
      label: `Go to ${s.label}`,
      hint: "Section",
      shortcut: s.key,
      run: () => {
        scrollToId(s.id);
        onClose();
      },
    }));
    const work = projects.map((p) => ({
      label: p.name,
      hint: "Project",
      run: () => {
        const target = document.getElementById(projectId(p.name));
        const details = target?.querySelector("details");
        if (details) details.open = true;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        onClose();
      },
    }));
    const actions: Command[] = [
      {
        label: "Open résumé",
        hint: "New tab",
        run: () => {
          window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        label: "Get in touch",
        hint: "Contact form",
        run: () => {
          onClose();
          requestContact();
        },
      },
      {
        label: "Scroll to top",
        hint: "Action",
        run: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onClose();
        },
      },
      {
        label: playing ? "Pause lofi" : "Play lofi",
        hint: "Action",
        run: () => {
          window.dispatchEvent(new Event("toggle-music"));
          onClose();
        },
      },
      {
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "Action",
        run: () => {
          document.querySelector<HTMLButtonElement>('[aria-label*="Switch to"]')?.click();
          onClose();
        },
      },
      {
        label: copied ? "Email copied" : "Copy email",
        hint: profile.email,
        run: () => {
          const fallback = () => {
            window.location.href = `mailto:${profile.email}`;
            onClose();
          };
          if (!navigator.clipboard) return fallback();
          navigator.clipboard.writeText(profile.email).then(() => {
            setCopied(true);
            window.setTimeout(onClose, 900);
          }, fallback);
        },
      },
    ];
    const links = socials.map((s) => ({
      label: s.label,
      hint: "New tab",
      run: () => {
        window.open(s.href, "_blank", "noopener,noreferrer");
        onClose();
      },
    }));
    return [...sections, ...work, ...actions, ...links];
  }, [onClose, playing, theme, copied]);

  const filtered = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return commands;
    return commands.filter((c) => fold(c.label + " " + c.hint).includes(q));
  }, [query, commands]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
        return;
      }
      // Section digits work only here, where the legend shows them, and only while the box is empty.
      if (query !== "" || e.metaKey || e.ctrlKey || e.altKey) return;
      const command = commands.find((c) => c.shortcut === e.key);
      if (command) {
        e.preventDefault();
        command.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, active, onClose, query, commands]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu and search"
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest shadow-2xl shadow-black/50 focus:outline-none"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Search input */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          aria-label="Search sections, projects and actions"
          placeholder="Section, project, résumé, contact…"
          className="w-full border-b border-border-subtle bg-transparent px-4 py-3.5 font-mono text-sm text-on-surface caret-primary outline-none placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-outline"
        />

        {/* Shortcut legend: keyboard affordances, so it stays out of the way on touch screens */}
        <div className="flex flex-wrap gap-2 border-b border-border-subtle px-4 py-2.5 pointer-coarse:hidden">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Jump:</span>
          {SECTIONS.map((s) => (
            <span key={s.key} className="flex items-center gap-1">
              <kbd className={KBD}>{s.key}</kbd>
              <span className="font-mono text-[10px] text-text-muted">{s.label}</span>
            </span>
          ))}
        </div>

        {/* Results */}
        <ul className="max-h-[50vh] overflow-y-auto p-2 sm:max-h-72">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-xs text-text-muted">No matches</li>
          )}
          {filtered.map((c, i) => (
            <li key={c.label}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => c.run()}
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-outline ${
                  i === active ? "bg-surface-container-high" : "hover:bg-surface-container-low"
                }`}
              >
                <span className="text-sm text-on-surface">{c.label}</span>
                <span className="flex items-center gap-2">
                  {c.shortcut && <kbd className={KBD}>{c.shortcut}</kbd>}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{c.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
