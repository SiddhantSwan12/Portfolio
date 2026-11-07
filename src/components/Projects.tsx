import Image from "next/image";
import { projectId, projects, type Project, type ProjectStatus } from "@/lib/content";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SkillIcon, hasSkillIcon } from "./SkillIcon";
import { ArrowUpRightIcon, ChevronDownIcon } from "./icons";

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
  Archived: "text-on-surface-variant",
};

// The status vocabulary from PRODUCT.md, surfaced where the word appears.
const STATUS_MEANING: Record<ProjectStatus, string> = {
  Live: "Deployed and reachable",
  Shipped: "Released, not hosted",
  Building: "In progress",
  Archived: "No public build",
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline";

const BUTTON = `inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-subtle bg-surface-container-lowest px-4 font-mono text-xs text-on-surface transition-colors hover:border-outline hover:text-primary ${FOCUS_RING}`;

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading title="Selected work" />

      <div className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
        {featured.map((p, i) => (
          <FeaturedProject key={p.name} project={p} priority={i === 0} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-primary">More projects</h3>
        <ul className="divide-y divide-border-subtle border-y border-border-subtle">
          {more.map((p) => (
            <ProjectRow key={p.name} project={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturedProject({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <Reveal
      as="article"
      id={projectId(project.name)}
      className="grid scroll-mt-20 gap-6 py-8 md:grid-cols-12 md:items-start md:gap-10 md:py-10"
    >
      <div className="md:col-span-5">
        <ProjectMedia project={project} priority={priority} />
      </div>
      <div className="flex min-w-0 flex-col gap-4 md:col-span-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">{project.name}</h3>
          <StatusPill status={project.status} year={project.year} />
        </div>
        <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">{project.description}</p>
        <TechChips tech={project.tech} />
        <ProjectLinks project={project} />
        {project.note ? (
          <p className="text-xs leading-relaxed text-on-surface-variant">{project.note}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li id={projectId(project.name)} className="scroll-mt-20">
      <details className="project-row">
        <summary
          className={`flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-4 ${FOCUS_RING}`}
        >
          <span className="text-base font-semibold text-primary">{project.name}</span>
          <span className="order-last basis-full text-sm leading-relaxed text-on-surface-variant md:order-none md:min-w-0 md:flex-1 md:basis-auto">
            {project.summary}
          </span>
          <StatusPill status={project.status} year={project.year} compact />
          <ChevronDownIcon className="project-row-chevron ml-auto shrink-0 text-on-surface-variant md:ml-0" />
        </summary>
        <div className="flex flex-col gap-4 pb-6">
          <p className="max-w-[70ch] text-base leading-relaxed text-on-surface-variant">{project.description}</p>
          <TechChips tech={project.tech} />
          <ProjectLinks project={project} />
          {project.note ? (
            <p className="max-w-[70ch] text-xs leading-relaxed text-on-surface-variant">{project.note}</p>
          ) : null}
        </div>
      </details>
    </li>
  );
}

function ProjectMedia({ project, priority }: { project: Project; priority: boolean }) {
  const { image, name, cover, coverCopy } = project;
  return (
    <div className="group relative aspect-[1.48] overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest">
      {image ? (
        <Image
          src={image}
          alt={`${name} screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 768px) 460px, calc(100vw - 32px)"
          className="object-contain object-center"
        />
      ) : (
        <ProjectCover kind={cover} label={name} copy={coverCopy} className="h-full border-b-0" />
      )}
    </div>
  );
}

function StatusPill({ status, year, compact = false }: { status: ProjectStatus; year: string; compact?: boolean }) {
  return (
    <span
      title={STATUS_MEANING[status]}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-border-subtle bg-surface-container-lowest font-medium ${
        compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
      } ${STATUS_TEXT[status]}`}
    >
      <span className={`size-2 rounded-full ${STATUS_COLOR[status]}`} />
      {status}
      <span className="text-on-surface-variant">· {year}</span>
    </span>
  );
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tech.map((t) => (
        <li
          key={t}
          className="inline-flex items-center gap-1.5 rounded border border-border-subtle bg-surface-container-low px-2.5 py-1 font-mono text-xs text-on-surface"
        >
          {hasSkillIcon(t) ? <SkillIcon name={t} className="size-3.5 shrink-0 text-on-surface-variant" /> : null}
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { href, hrefLabel, repo, name } = project;

  if (!href && !repo) {
    return <p className="font-mono text-xs text-on-surface-variant">No public build</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {repo ? (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source code on GitHub`}
          className={BUTTON}
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
          className={BUTTON}
        >
          <span>{hrefLabel ?? "Live demo"}</span>
          <ArrowUpRightIcon />
        </a>
      ) : null}
    </div>
  );
}
