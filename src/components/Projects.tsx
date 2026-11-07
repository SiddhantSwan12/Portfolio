import Image from "next/image";
import { projects, type Project, type ProjectStatus } from "@/lib/content";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SkillIcon, hasSkillIcon } from "./SkillIcon";

const STATUS_COLOR: Record<ProjectStatus, string> = {
  Live: "bg-live",
  Shipped: "bg-primary",
  Building: "bg-building",
  Archived: "bg-idle",
};

const STATUS_TEXT: Record<ProjectStatus, string> = {
  Live: "text-primary",
  Shipped: "text-primary",
  Building: "text-on-surface-variant",
  Archived: "text-text-muted",
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="02" eyebrow="Things I've built" title="Projects" />

      <div className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={(i % 2) * 0.06}
            as="article"
            className="group relative min-h-[560px] bg-background p-5 transition-colors hover:bg-surface-container-lowest md:p-8"
          >
            <div className="flex h-full min-w-0 flex-col">
              <ProjectMedia project={p} priority={i < 2} />

              <div className="mt-8 flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                    {p.name}
                  </h3>
                  <StatusPill status={p.status} year={p.year} />
                </div>

                <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-text-muted">
                  {p.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                  <TechList tech={p.tech} />
                  <ProjectLinks project={p} />
                </div>

                {p.note ? (
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-text-muted">{p.note}</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectMedia({ project, priority }: { project: Project; priority: boolean }) {
  const { image, name, cover, coverCopy } = project;
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-500 ease-premium group-hover:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative aspect-[1.48] overflow-hidden rounded-lg border border-outline-variant/70 bg-background">
        {image ? (
          <Image
            src={image}
            alt={`${name} screenshot`}
            fill
            priority={priority}
            sizes="(min-width: 768px) 560px, calc(100vw - 72px)"
            className="object-contain object-center opacity-90 transition duration-700 ease-premium group-hover:scale-[1.035] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 transition duration-700 ease-premium group-hover:scale-[1.035]">
            <ProjectCover kind={cover} label={name} copy={coverCopy} className="h-full border-b-0" />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status, year }: { status: ProjectStatus; year: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-border-subtle bg-surface-container-lowest px-3 py-1.5 text-sm font-medium ${STATUS_TEXT[status]}`}
    >
      <span className={`size-2.5 rounded-full ${STATUS_COLOR[status]}`} />
      {status}
      <span className="hidden text-text-muted sm:inline">· {year}</span>
    </span>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
      {tech.map((t) =>
        hasSkillIcon(t) ? (
          <span
            key={t}
            title={t}
            aria-label={t}
            className="grid size-7 place-items-center rounded bg-transparent text-on-surface-variant transition-colors hover:text-primary"
          >
            <SkillIcon name={t} className="size-5 shrink-0" />
          </span>
        ) : (
          <span
            key={t}
            className="inline-flex h-7 items-center rounded bg-transparent font-mono text-xs text-on-surface-variant"
          >
            {t}
          </span>
        ),
      )}
    </div>
  );
}

const LINK_CLASS =
  "group/link inline-flex shrink-0 items-center gap-1.5 text-base font-semibold text-text-muted transition-colors hover:text-primary";

function ProjectLinks({ project }: { project: Project }) {
  const { href, hrefLabel, repo, name } = project;

  if (!href && !repo) {
    return <span className="ml-auto font-mono text-xs text-text-muted">No public build</span>;
  }

  return (
    <div className="ml-auto flex shrink-0 items-center gap-5">
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source code on GitHub`}
          className={LINK_CLASS}
        >
          <SkillIcon name="GitHub" className="size-4 shrink-0" />
          <span>Source</span>
        </a>
      ) : null}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${hrefLabel ?? "Live demo"}: ${name}`}
          className={LINK_CLASS}
        >
          <span>{hrefLabel ?? "Live demo"}</span>
          <ArrowIcon />
        </a>
      ) : null}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
