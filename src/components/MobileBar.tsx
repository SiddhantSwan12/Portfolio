"use client";

import { profile } from "@/lib/content";
import { requestContact } from "./ContactComposer";
import { DocumentIcon, GridIcon, MailIcon } from "./icons";

/**
 * Thumb-reach actions for phones (below md): the three things both audiences come to do.
 * Hidden on wide screens, where the header carries them, and in landscape (see globals.css).
 */
const ITEM =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-lg font-mono text-xs text-on-surface-variant transition-colors active:bg-surface-container-low focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-outline";

export function MobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/85 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex w-full max-w-container items-stretch gap-1 px-2 pb-[env(safe-area-inset-bottom)]">
        <a href="#projects" className={ITEM}>
          <GridIcon />
          Projects
        </a>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={ITEM}>
          <DocumentIcon />
          Résumé
        </a>
        <button type="button" onClick={(event) => requestContact(event.currentTarget)} className={ITEM}>
          <MailIcon />
          Contact
        </button>
      </div>
    </nav>
  );
}
