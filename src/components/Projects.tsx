import { projects, type ProjectStatus } from "@/lib/content";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

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
            className="group flex overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest transition-colors hover:border-outline-variant"
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
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border-subtle bg-surface-container-low px-2.5 py-1 font-mono text-[11px] text-on-surface-variant"
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
