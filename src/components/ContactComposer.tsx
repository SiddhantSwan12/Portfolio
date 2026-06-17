"use client";

import { useEffect, useId, useState } from "react";
import { profile } from "@/lib/content";

export function ContactComposer() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim() || "a visitor"}`);
    const body = encodeURIComponent(
      [
        `Hi ${profile.name},`,
        "",
        message.trim() || "I wanted to get in touch after viewing your portfolio.",
        "",
        "Best,",
        name.trim() || "A portfolio visitor",
        from.trim() ? from.trim() : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-6 py-3 font-mono text-sm text-on-primary transition-all hover:opacity-90 active:scale-95"
      >
        Get in touch
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="Close contact form"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest"
          >
            <div className="border-b border-border-subtle p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                {profile.email}
              </p>
              <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-primary">
                Send a message
              </h2>
            </div>

            <div className="flex flex-col gap-4 p-5">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-outline"
                  autoFocus
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">Email</span>
                <input
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                  type="email"
                  className="rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-outline"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">Message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={6}
                  className="resize-none rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm leading-relaxed text-on-surface outline-none transition-colors focus:border-outline"
                />
              </label>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border-subtle px-4 py-2.5 font-mono text-xs text-primary transition-colors hover:bg-surface-container-low"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={sendEmail}
                  className="rounded-lg bg-primary px-4 py-2.5 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95"
                >
                  Open email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
