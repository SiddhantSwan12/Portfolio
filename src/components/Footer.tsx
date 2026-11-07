import { profile, socials } from "@/lib/content";

const LINK =
  "inline-flex min-h-11 min-w-11 items-center justify-center font-mono text-xs text-text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline";

export function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-border-subtle bg-surface">
      {/* Bottom padding below md clears the fixed phone action bar and the home indicator. */}
      <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 pt-12 pb-[calc(5.5rem_+_env(safe-area-inset-bottom))] md:flex-row md:items-center md:justify-between md:gap-8 md:px-16 md:pb-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-primary">{profile.name}</span>
          <span className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with precision.
          </span>
        </div>

        <div className="-mx-2 flex flex-wrap gap-x-3 gap-y-0">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {s.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className={LINK}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
