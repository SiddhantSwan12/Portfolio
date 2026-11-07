"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { profile, socials } from "@/lib/content";
import { AmbientBanner } from "./AmbientBanner";
import { ContactComposer } from "./ContactComposer";
import { CurrentTime } from "./ThemeControls";

const EASE = [0.2, 0.8, 0.2, 1] as const;

// The two links that serve the audiences in PRODUCT.md; the full set lives in the footer.
const HERO_LINKS = ["GitHub", "LinkedIn"];

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };
  const quickLinks = socials.filter((s) => HERO_LINKS.includes(s.label));

  return (
    <section id="about" className="mx-auto w-full max-w-container min-w-0 px-4 pt-20 md:px-16 md:pt-24">
      {/* Banner */}
      <motion.div {...rise(0)}>
        <AmbientBanner className="h-36 w-full sm:h-40 md:h-52">
          <div className="relative z-10 flex h-full flex-col justify-between p-3 sm:p-4 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border-subtle bg-surface-container-lowest/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant backdrop-blur">
                <span className="size-1.5 animate-pulse rounded-full bg-live" />
                {profile.availability}
              </span>
              <CurrentTime className="rounded border border-white/15 bg-black/35 px-3 py-1.5 text-base font-semibold leading-none tracking-[0.2em] text-white backdrop-blur-sm sm:text-lg sm:tracking-[0.28em] md:text-3xl" />
            </div>
            <p className="w-fit max-w-md rounded border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 shadow-[0_1px_18px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:tracking-[0.18em]">
              Backend systems × applied AI
            </p>
          </div>
        </AmbientBanner>
      </motion.div>

      {/* Identity */}
      <div className="mt-6 flex flex-col gap-5 md:mt-8 md:gap-6">
        <motion.div {...rise(0.08)} className="flex items-center gap-4 md:gap-5">
          <Image
            src={profile.avatar}
            alt={`${profile.name} avatar`}
            width={96}
            height={96}
            priority
            className="size-16 shrink-0 rounded-full border border-border-subtle bg-surface-container object-cover md:size-24"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-on-surface-variant md:mt-2 md:text-sm">
              {profile.headline}
            </p>
          </div>
        </motion.div>

        <motion.p {...rise(0.16)} className="max-w-2xl text-base leading-relaxed text-on-surface md:text-lg">
          {profile.tagline}
        </motion.p>

        {profile.intro.map((line) => (
          <motion.p key={line} {...rise(0.22)} className="max-w-2xl text-base leading-relaxed text-on-surface-variant">
            {line}
          </motion.p>
        ))}

        {/* One primary action, one secondary, and the two links both audiences reach for */}
        <motion.div {...rise(0.28)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <div className="flex flex-wrap gap-3">
            <ContactComposer />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-lg border border-border-subtle bg-transparent px-5 font-mono text-sm text-primary transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline"
            >
              View résumé
            </a>
          </div>
          <div className="-mx-2 flex items-center font-mono text-xs">
            {quickLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
