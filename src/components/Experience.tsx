import Image from "next/image";
import { experiences } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="01" eyebrow="Where I've worked" title="Experience" />

      <div className="ml-3 flex flex-col gap-12 border-l border-border-subtle">
        {experiences.map((xp, i) => (
          <Reveal key={xp.org} delay={i * 0.05} as="article" className="relative pl-8">
            {/* Timeline dot — solid for the current role, hollow otherwise */}
            <span
              className={`absolute -left-[6.5px] top-1.5 size-3 rounded-full ring-4 ring-background ${
                xp.active ? "bg-primary" : "border border-border-subtle bg-surface-variant"
              }`}
            />
            <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-surface-container-lowest p-5 transition-colors hover:border-outline-variant sm:flex-row sm:items-start">
              <CompanyLogo
                alt={`${xp.logo.wordmark} logo`}
                initials={xp.logo.initials}
                src={xp.logo.src}
                wordmark={xp.logo.wordmark}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{xp.org}</h3>
                    <p className="mt-1 text-base text-on-surface-variant">{xp.role}</p>
                  </div>
                  <p className="shrink-0 font-mono text-xs uppercase leading-relaxed text-text-muted sm:text-right">
                    {xp.period}
                    {xp.location ? <span className="block">{xp.location}</span> : null}
                  </p>
                </div>
            <ul className="mt-3 flex list-inside list-disc flex-col gap-1.5 text-base leading-relaxed text-text-muted marker:text-outline-variant">
              {xp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {xp.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-surface-container-high px-2 py-1 font-mono text-xs text-on-surface-variant"
                >
                  {t}
                </span>
              ))}
            </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CompanyLogo({
  alt,
  initials,
  src,
  wordmark,
}: {
  alt: string;
  initials: string;
  src?: string;
  wordmark: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 sm:w-36 sm:flex-col sm:items-start">
      <div className="grid size-14 place-items-center overflow-hidden rounded-lg border border-border-subtle bg-white p-1.5">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={56}
            height={56}
            className="size-full object-contain"
          />
        ) : (
          <BrandMark initials={initials} />
        )}
      </div>
      <span className="max-w-32 font-mono text-[11px] uppercase leading-snug tracking-wider text-text-muted">
        {wordmark}
      </span>
    </div>
  );
}

function BrandMark({ initials }: { initials: string }) {
  if (initials === "E") {
    return (
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <path d="M10 10 H29 M10 20 H25 M10 30 H29" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="31" cy="10" r="2.5" fill="var(--color-live)" />
        <circle cx="27" cy="20" r="2.5" fill="var(--color-outline)" />
        <circle cx="31" cy="30" r="2.5" fill="var(--color-building)" />
      </svg>
    );
  }

  if (initials === "GS") {
    return (
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <path d="M17 10 H12 C8 10 6 13 6 20 C6 27 9 30 15 30 H19 V22 H14" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 12 H26 C22 12 20 14 20 17 C20 25 34 20 34 28 C34 31 31 32 27 32 H21" fill="none" stroke="var(--color-outline)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (initials === "GT") {
    return (
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--color-outline)" strokeWidth="2" />
        <path d="M12 14 H28 M20 14 V30 M12 22 H20" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
      <path d="M8 30 V11 L20 23 L32 11 V30" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 8 L32 4 L36 8 L32 12 Z" fill="var(--color-building)" />
    </svg>
  );
}
