import { projects, type ProjectStatus } from "@/lib/content";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SkillIcon, hasSkillIcon } from "./SkillIcon";

const STATUS_COLOR: Record<ProjectStatus, string> = {
  Live: "bg-live",
  Building: "bg-building",
  "Not Started": "bg-idle",
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="02" eyebrow="Things I've built" title="Projects" />

      <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={(i % 2) * 0.06}
            as="article"
            className="group relative flex overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest transition-colors hover:border-outline-variant"
          >
            <div className="flex w-full flex-col">
              <ProjectCover kind={p.cover} />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-primary">{p.name}</h3>
                  <span className="flex shrink-0 items-center gap-1.5 rounded border border-border-subtle bg-surface-container-high px-2 py-1 font-mono text-xs text-primary">
                    <span className={`size-2 rounded-full ${STATUS_COLOR[p.status]}`} />
                    {p.status}
                    <span className="text-text-muted">· {p.year}</span>
                  </span>
                </div>
                <p className="text-base leading-relaxed text-text-muted">{p.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {p.tech.map((t) =>
                    hasSkillIcon(t) ? (
                      <span
                        key={t}
                        title={t}
                        aria-label={t}
                        className="grid size-8 place-items-center rounded border border-border-subtle bg-surface-container-low text-on-surface-variant transition-colors hover:border-outline hover:text-on-surface"
                      >
                        <SkillIcon name={t} className="size-4 shrink-0" />
                      </span>
                    ) : (
                      <span
                        key={t}
                        className="inline-flex h-8 items-center rounded border border-border-subtle bg-surface-container-low px-2.5 font-mono text-[11px] text-on-surface-variant"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-label={`View ${p.name} live`}
              >
                <span className="flex items-center gap-2 rounded-lg border border-outline bg-surface-container px-4 py-2.5 text-sm font-medium text-on-surface shadow-lg backdrop-blur-sm transition-transform duration-150 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  View Live
                </span>
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
