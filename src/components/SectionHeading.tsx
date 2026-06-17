import { Reveal } from "./Reveal";

/** Editorial eyebrow + headline used across sections (DESIGN.md §3). */
export function SectionHeading({
  index,
  eyebrow,
  title,
  action,
}: {
  index: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          {index} / {eyebrow}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}
