import { getGitHubStats, type ContribDay } from "@/lib/github";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";

// Monochrome intensity ramp for the contribution grid (level 0 → 4).
const LEVEL_BG = [
  "var(--contrib-level-0)",
  "var(--contrib-level-1)",
  "var(--contrib-level-2)",
  "var(--contrib-level-3)",
  "var(--contrib-level-4)",
];

// A phone shows the most recent half-year edge to edge; wider screens get the full year.
const PHONE_WEEKS = 26;

// Quiet placeholder when GitHub is rate-limiting: the same shape, no data.
const EMPTY_WEEKS: ContribDay[][] = Array.from({ length: 53 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ({ date: `empty-${w}-${d}`, count: 0, level: 0 as const })),
);

export async function OpenSource() {
  const stats = await getGitHubStats();

  return (
    <section id="open-source" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading
        title="GitHub Activity"
        action={
          <a
            href="https://github.com/SiddhantSwan12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline"
          >
            @SiddhantSwan12
            <ArrowUpRightIcon />
          </a>
        }
      />

      {/* Contribution calendar — live from GitHub, falls back to a quiet grid */}
      <Reveal className="min-w-0 rounded-xl border border-border-subtle bg-surface-container-lowest p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {stats.ok
              ? `${stats.totalContributions} contributions in the last year · ${stats.repos} public repos`
              : "Contribution graph"}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-text-muted">
            <span>Less</span>
            {LEVEL_BG.map((c) => (
              <span key={c} className="size-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="mt-4 max-w-full overflow-x-auto">
          <CalendarGrid weeks={stats.weeks} />
        </div>
        <p className="mt-3 font-mono text-xs text-text-muted md:hidden">Last 26 weeks</p>
        {!stats.ok && (
          <p className="mt-4 font-mono text-xs text-text-muted">
            GitHub data is temporarily unavailable — showing an empty grid.
          </p>
        )}
      </Reveal>
    </section>
  );
}

function CalendarGrid({ weeks }: { weeks: ContribDay[][] }) {
  const live = weeks.length > 0;
  const columns = live ? weeks : EMPTY_WEEKS;
  const firstPhoneWeek = Math.max(0, columns.length - PHONE_WEEKS);

  return (
    <div
      className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-[3px] md:flex md:w-max md:gap-1"
      aria-hidden
    >
      {columns.map((week, wi) => (
        <div
          key={wi}
          className={`${wi < firstPhoneWeek ? "hidden md:grid" : "grid"} grid-rows-7 gap-[3px] md:gap-1`}
        >
          {week.map((day) => (
            <span
              key={day.date}
              title={live ? `${day.count} on ${day.date}` : undefined}
              className="aspect-square w-full rounded-[2px] md:size-2.5"
              style={{ backgroundColor: LEVEL_BG[day.level] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
