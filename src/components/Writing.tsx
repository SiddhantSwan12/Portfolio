import { posts } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Writing() {
  return (
    <section id="writing" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="06" eyebrow="Notes & ideas" title="Writing" />

      {posts.length === 0 ? (
        <Reveal className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border-subtle bg-surface-container-lowest p-8">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Coming soon
          </span>
          <p className="max-w-md text-base text-on-surface-variant">
            I&apos;m putting together notes on backend systems, LLMs and the messy problems in
            between. First posts land soon.
          </p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal
              key={post.title}
              delay={(i % 2) * 0.06}
              as="article"
              className="group flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface-container-lowest p-6 transition-colors hover:border-outline-variant"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                {post.date} · {post.tag}
              </span>
              <h3 className="text-lg font-semibold text-primary">{post.title}</h3>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
