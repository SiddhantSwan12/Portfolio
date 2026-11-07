import { Reveal } from "./Reveal";

/** Section headline. The heading carries its own weight: no eyebrow, no index. */
export function SectionHeading({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <h2 className="text-3xl font-semibold tracking-tight text-primary">{title}</h2>
      {action}
    </Reveal>
  );
}
