import { profile, socials } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm font-medium text-primary">{profile.name}</span>
          <span className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with precision.
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted transition-colors hover:text-primary"
            >
              {s.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-text-muted transition-colors hover:text-primary"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
