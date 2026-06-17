"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { profile, socials } from "@/lib/content";
import { AmbientBanner } from "./AmbientBanner";
import { ContactComposer } from "./ContactComposer";
import { CurrentTime } from "./ThemeControls";

const EASE = [0.2, 0.8, 0.2, 1] as const;

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

  return (
    <section id="about" className="mx-auto w-full max-w-container min-w-0 px-4 pt-24 md:px-16 md:pt-28">
      {/* Banner */}
      <motion.div {...rise(0)}>
        <AmbientBanner className="h-44 w-full md:h-60">
          <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border-subtle bg-surface-container-lowest/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant backdrop-blur">
                <span className="size-1.5 animate-pulse rounded-full bg-live" />
                Open to SWE / AI roles · mid-2026
              </span>
              <CurrentTime className="text-2xl font-semibold leading-none tracking-[0.28em] text-white drop-shadow-[0_1px_10px_rgba(13,30,55,0.8)] md:text-4xl" />
            </div>
            <p className="w-fit max-w-md rounded border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 shadow-[0_1px_18px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              Backend systems × applied AI
            </p>
          </div>
        </AmbientBanner>
      </motion.div>

      {/* Identity */}
      <div className="mt-8 flex flex-col gap-7 md:mt-10">
        <motion.div {...rise(0.08)} className="flex items-center gap-5">
          <Image
            src={profile.avatar}
            alt={`${profile.name} portrait`}
            width={96}
            height={96}
            priority
            className="size-20 shrink-0 rounded-full border border-border-subtle bg-surface-container object-cover md:size-24"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-on-surface-variant md:text-sm">
              {profile.headline}
            </p>
          </div>
        </motion.div>

        <motion.p {...rise(0.16)} className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          {profile.tagline}
        </motion.p>

        <motion.ul
          {...rise(0.22)}
          className="flex max-w-2xl list-inside list-disc flex-col gap-2 text-base leading-relaxed text-text-muted marker:text-outline-variant"
        >
          {profile.intro.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div {...rise(0.28)} className="flex flex-wrap gap-3">
          <ContactComposer />
          <a
            href={profile.resumeUrl}
            className="rounded-lg border border-border-subtle bg-transparent px-6 py-3 font-mono text-sm text-primary transition-colors hover:bg-surface-container-low"
          >
            View résumé
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div {...rise(0.34)} className="flex flex-col gap-3 border-t border-border-subtle pt-7">
          <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Find me online
          </h2>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border-subtle bg-surface-container-lowest px-4 py-2 font-mono text-xs text-on-surface transition-colors hover:border-outline"
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
