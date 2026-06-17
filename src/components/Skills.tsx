import { skillGroups } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="04" eyebrow="My toolkit" title="Skills & Technologies" />

      <div className="grid gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 0.04}
            className={`relative min-h-44 overflow-hidden bg-surface-container-lowest p-5 ${
              i === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-outline to-transparent opacity-40" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  {String(i + 1).padStart(2, "0")} / {group.label}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {describeSkillGroup(group.label)}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border-subtle bg-surface-container font-mono text-xs text-primary">
                {group.items.length}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border-subtle bg-surface-container-low px-3 py-1.5 font-mono text-xs text-on-surface transition-colors hover:border-outline hover:bg-surface-container"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function describeSkillGroup(label: string) {
  const copy: Record<string, string> = {
    Top: "Primary strengths I reach for first when shaping systems.",
    Languages: "The syntax layer for APIs, automation, data and contracts.",
    Frontend: "Interfaces, motion and product surfaces that stay fast.",
    Backend: "Service design, persistence and real-time product foundations.",
    "AI / ML": "Model workflows, perception tools and LLM application layers.",
    "Cloud & DevOps": "Shipping, hosting and keeping projects reproducible.",
    Testing: "Validation habits for edge cases and API confidence.",
  };

  return copy[label] ?? "Tools I use to move from idea to shipped product.";
}
