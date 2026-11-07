"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { profile } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";
type Draft = Record<Field, string>;

// Web3Forms access keys are public by design; the honeypot below is the spam guard.
const WEB3FORMS_KEY = "0df4f791-955a-4999-8691-30b59c50e1c8";
const DRAFT_KEY = "contact-draft";
const OPEN_EVENT = "open-contact";

/**
 * Open the contact dialog from anywhere (the phone action bar uses this).
 * `returnTo` is the control that should get focus back when the dialog closes.
 */
export function requestContact(returnTo?: HTMLElement | null) {
  window.dispatchEvent(new CustomEvent<{ returnTo: HTMLElement | null }>(OPEN_EVENT, { detail: { returnTo: returnTo ?? null } }));
}
const EMPTY: Draft = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(draft: Draft): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!draft.name.trim()) errors.name = "Please add your name.";
  if (!draft.email.trim()) {
    errors.email = "Please add an email address so I can reply.";
  } else if (!EMAIL_RE.test(draft.email.trim())) {
    errors.email = "That doesn't look like an email address: it needs an @ and a domain.";
  }
  if (!draft.message.trim()) errors.message = "Please write a message.";
  return errors;
}

// The draft lives in sessionStorage so an interruption, a backdrop tap or a reload
// in the same tab never loses it. It is cleared only after a successful send.
function readDraft(): Draft {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return {
      name: String(parsed.name ?? ""),
      email: String(parsed.email ?? ""),
      message: String(parsed.message ?? ""),
    };
  } catch {
    return EMPTY;
  }
}

function writeDraft(draft: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory draft still works.
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline";

const INPUT =
  "w-full rounded-lg border border-border-subtle bg-surface-container-low px-3 py-2.5 text-base text-on-surface caret-primary transition-colors placeholder:text-text-muted focus:border-outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-outline aria-[invalid=true]:border-error";

const LABEL = "font-mono text-xs uppercase tracking-wider text-text-muted";

export function ContactComposer() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const [bot, setBot] = useState(false);
  const titleId = useId();
  const fieldId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Where focus goes when the dialog closes: the opener, which may be the phone action bar.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const errors = validate(draft);
  const errorFor = (field: Field) => ((touched[field] || submitted) ? errors[field] : undefined);

  const openDialog = useCallback((returnTo?: HTMLElement | null) => {
    returnFocusRef.current = returnTo ?? triggerRef.current;
    setDraft(readDraft());
    setTouched({});
    setSubmitted(false);
    setFailure(null);
    setStatus("idle");
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ returnTo?: HTMLElement | null }>).detail;
      openDialog(detail?.returnTo ?? null);
    };
    window.addEventListener(OPEN_EVENT, onRequest);
    return () => window.removeEventListener(OPEN_EVENT, onRequest);
  }, [openDialog]);

  const update = (field: Field, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      writeDraft(next);
      return next;
    });
  };

  // While open: lock page scroll, keep Tab inside the dialog, close on Escape,
  // and hand focus back to the trigger afterwards.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    const returnTo = returnFocusRef.current ?? triggerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      returnTo?.focus();
    };
  }, [open, closeDialog]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setSubmitted(true);

    const currentErrors = validate(draft);
    const firstInvalid = (Object.keys(currentErrors) as Field[])[0];
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFailure(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio inquiry from ${draft.name.trim()}`,
          from_name: draft.name.trim(),
          email: draft.email.trim(),
          message: draft.message.trim(),
          botcheck: bot ? "on" : "",
        }),
      });
      const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (response.ok && data?.success) {
        setStatus("sent");
        clearDraft();
        return;
      }
      const detail = data?.message ? ` (${data.message})` : response.ok ? "" : ` (HTTP ${response.status})`;
      setFailure(`The mail service rejected the message${detail}.`);
      setStatus("error");
    } catch {
      setFailure("The mail service couldn't be reached. Check your connection and try again.");
      setStatus("error");
    }
  };

  const finish = () => {
    setDraft(EMPTY);
    setStatus("idle");
    closeDialog();
  };

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${draft.name.trim() || "your site"}`,
  )}&body=${encodeURIComponent(draft.message)}`;

  const fields: { field: Field; label: string; autoComplete: string; type?: string; placeholder: string }[] = [
    { field: "name", label: "Name", autoComplete: "name", placeholder: "Your name" },
    { field: "email", label: "Email", autoComplete: "email", type: "email", placeholder: "you@example.com" },
  ];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => openDialog()}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`inline-flex min-h-11 items-center rounded-lg bg-primary px-6 font-mono text-sm text-on-primary transition-all hover:opacity-90 active:scale-95 ${FOCUS_RING}`}
      >
        Get in touch
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Close contact form"
            onClick={closeDialog}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[calc(100dvh-3rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-border-subtle bg-surface-container-lowest"
          >
            <div className="border-b border-border-subtle p-5">
              <a
                href={`mailto:${profile.email}`}
                className={`font-mono text-xs text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline ${FOCUS_RING}`}
              >
                {profile.email}
              </a>
              <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-primary">
                Send a message
              </h2>
            </div>

            {status === "sent" ? (
              <div role="status" className="flex flex-col items-center gap-4 p-10 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-live"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <h3 className="text-xl font-semibold text-primary">Message sent</h3>
                <p className="text-sm text-on-surface-variant">
                  Thanks for reaching out. I&apos;ll reply to {draft.email.trim() || "your address"}.
                </p>
                <button
                  type="button"
                  onClick={finish}
                  className={`mt-2 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95 ${FOCUS_RING}`}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-5">
                {fields.map(({ field, label, autoComplete, type, placeholder }) => {
                  const id = `${fieldId}-${field}`;
                  const error = errorFor(field);
                  return (
                    <div key={field} className="flex flex-col gap-2">
                      <label htmlFor={id} className={LABEL}>
                        {label}
                      </label>
                      <input
                        id={id}
                        name={field}
                        type={type ?? "text"}
                        autoComplete={autoComplete}
                        required
                        maxLength={field === "name" ? 120 : 254}
                        value={draft[field]}
                        onChange={(event) => update(field, event.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, [field]: true }))}
                        placeholder={placeholder}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${id}-error` : undefined}
                        className={INPUT}
                        autoFocus={field === "name"}
                        disabled={status === "sending"}
                      />
                      {error ? (
                        <p id={`${id}-error`} className="text-xs text-error">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                })}

                <div className="flex flex-col gap-2">
                  <label htmlFor={`${fieldId}-message`} className={LABEL}>
                    Message
                  </label>
                  <textarea
                    id={`${fieldId}-message`}
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    value={draft.message}
                    onChange={(event) => update("message", event.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    placeholder="What would you like to talk about?"
                    aria-invalid={errorFor("message") ? true : undefined}
                    aria-describedby={errorFor("message") ? `${fieldId}-message-error` : undefined}
                    className={`${INPUT} resize-y leading-relaxed`}
                    disabled={status === "sending"}
                  />
                  {errorFor("message") ? (
                    <p id={`${fieldId}-message-error`} className="text-xs text-error">
                      {errorFor("message")}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot: hidden from people, filled by bots, treated as spam by Web3Forms. */}
                <label className="hidden" aria-hidden="true">
                  Leave this box empty
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    checked={bot}
                    onChange={(event) => setBot(event.target.checked)}
                  />
                </label>

                {status === "error" && failure ? (
                  <div
                    role="alert"
                    className="flex flex-col gap-1 rounded-lg border border-error/40 bg-error/10 px-3 py-2.5 text-sm text-on-surface"
                  >
                    <p>{failure}</p>
                    <p className="text-on-surface-variant">
                      Your draft is still here. You can also{" "}
                      <a href={mailtoHref} className={`text-primary underline underline-offset-4 ${FOCUS_RING}`}>
                        email me directly
                      </a>{" "}
                      with the same message.
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-on-surface-variant">Your draft is kept in this tab until it&apos;s sent.</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeDialog}
                      disabled={status === "sending"}
                      className={`inline-flex min-h-11 items-center rounded-lg border border-border-subtle px-4 font-mono text-xs text-primary transition-colors hover:bg-surface-container-low disabled:opacity-50 ${FOCUS_RING}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      aria-busy={status === "sending"}
                      className={`inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-mono text-xs text-on-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${FOCUS_RING}`}
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
