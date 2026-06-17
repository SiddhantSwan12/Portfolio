import { getGitHubStats, type ContribDay } from "@/lib/github";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Monochrome intensity ramp for the contribution grid (level 0 → 4).
const LEVEL_BG = [
  "var(--contrib-level-0)",
  "var(--contrib-level-1)",
  "var(--contrib-level-2)",
  "var(--contrib-level-3)",
  "var(--contrib-level-4)",
];

export async function OpenSource() {
  const stats = await getGitHubStats();

  const tiles = [
    { label: "PRs merged", value: stats.mergedPRs },
    { label: "Public repos", value: stats.repos },
    { label: "Stars earned", value: stats.stars },
  ];

  return (
    <section id="open-source" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading
        index="03"
        eyebrow="In the open"
        title="Open Source"
        action={
          <a
            href="https://github.com/SiddhantSwan12"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-xs text-text-muted transition-colors hover:text-primary sm:block"
          >
            @SiddhantSwan12 ↗
          </a>
        }
      />

      <Reveal className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-3">
        {tiles.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 bg-surface-container-lowest p-5 md:p-6">
            <span className="text-3xl font-semibold tabular-nums text-primary md:text-4xl">
              {s.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </Reveal>

      {/* Contribution calendar — live from GitHub, falls back to a quiet grid */}
      <Reveal className="min-w-0 rounded-xl border border-border-subtle bg-surface-container-lowest p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {stats.ok
              ? `${stats.totalContributions} contributions in the last year`
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
        {!stats.ok && (
          <p className="mt-4 font-mono text-[11px] text-text-muted">
            GitHub data is temporarily unavailable — showing an empty grid.
          </p>
        )}
      </Reveal>
    </section>
  );
}

function CalendarGrid({ weeks }: { weeks: ContribDay[][] }) {
  // Fallback: render a quiet empty 53×7 grid if no live data.
  if (weeks.length === 0) {
    return (
      <div
        className="grid w-max grid-flow-col gap-1"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
        aria-hidden
      >
        {Array.from({ length: 53 * 7 }).map((_, i) => (
          <span key={i} className="size-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_BG[0] }} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-max gap-1" aria-hidden>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-rows-7 gap-1">
          {week.map((day) => (
            <span
              key={day.date}
              title={`${day.count} on ${day.date}`}
              className="size-2.5 rounded-[2px]"
              style={{ backgroundColor: LEVEL_BG[day.level] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
