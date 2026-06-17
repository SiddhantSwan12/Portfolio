"use client";

import { useEffect, useId, useState } from "react";
import { profile } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

// ─── Replace this with your Web3Forms access key ───
// Get one for free at https://web3forms.com (enter your email → check inbox)
const WEB3FORMS_KEY = "0df4f791-955a-4999-8691-30b59c50e1c8";

export function ContactComposer() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    // Reset form after closing
    setTimeout(() => {
      setName("");
      setFrom("");
      setMessage("");
      setStatus("idle");
    }, 300);
  };

  const handleSend = async () => {
    if (!name.trim() || !from.trim() || !message.trim()) return;

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio inquiry from ${name.trim()}`,
          from_name: name.trim(),
          email: from.trim(),
          message: message.trim(),
          to: profile.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
            onClick={handleClose}
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

            {/* ── Success state ── */}
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-4 p-10 text-center">
                <span className="text-4xl">✓</span>
                <h3 className="text-xl font-semibold text-primary">Message sent!</h3>
                <p className="text-sm text-text-muted">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 rounded-lg bg-primary px-5 py-2.5 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95"
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <div className="flex flex-col gap-4 p-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    Name <span className="text-error">*</span>
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition-colors placeholder:text-text-muted/50 focus:border-outline"
                    autoFocus
                    disabled={status === "sending"}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    Email <span className="text-error">*</span>
                  </span>
                  <input
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none transition-colors placeholder:text-text-muted/50 focus:border-outline"
                    disabled={status === "sending"}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    Message <span className="text-error">*</span>
                  </span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    placeholder="What would you like to talk about?"
                    className="resize-none rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-sm leading-relaxed text-on-surface outline-none transition-colors placeholder:text-text-muted/50 focus:border-outline"
                    disabled={status === "sending"}
                  />
                </label>

                {status === "error" && (
                  <p className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-xs text-error">
                    Something went wrong. Please try again.
                  </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={status === "sending"}
                    className="rounded-lg border border-border-subtle px-4 py-2.5 font-mono text-xs text-primary transition-colors hover:bg-surface-container-low disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={status === "sending" || !name.trim() || !from.trim() || !message.trim()}
                    className="rounded-lg bg-primary px-4 py-2.5 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
