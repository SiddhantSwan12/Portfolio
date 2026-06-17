import Image from "next/image";
import { certifications, education } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="mx-auto flex w-full max-w-container min-w-0 flex-col gap-10 px-4 md:px-16">
      <SectionHeading index="05" eyebrow="Background" title="Education & Credentials" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* Education */}
        <Reveal className="md:col-span-2">
          <div className="flex h-full flex-col gap-4 rounded-xl border border-border-subtle bg-surface-container-lowest p-6">
            <div className="flex items-start gap-4">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-border-subtle bg-white p-2">
                <Image
                  src={education.logo}
                  alt={`${education.school} logo`}
                  width={64}
                  height={64}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {education.period} · {education.location}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-primary">{education.school}</h3>
              </div>
            </div>
            <p className="text-base text-on-surface-variant">{education.degree}</p>
            <p className="mt-auto pt-3 font-mono text-sm text-on-surface">GPA {education.gpa}</p>
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.06} className="md:col-span-3">
          <ul className="flex h-full flex-col divide-y divide-border-subtle rounded-xl border border-border-subtle bg-surface-container-lowest px-6">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <p className="text-base text-on-surface">{c.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {c.issuer}
                  </p>
                </div>
                {c.year && (
                  <span className="shrink-0 font-mono text-xs text-text-muted">{c.year}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
