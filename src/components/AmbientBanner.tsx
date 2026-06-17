"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Original, procedural hero banner — no external/copyrighted artwork.
 * A monochrome "technical field": a faint drifting grid, a slow parallax
 * glow, and a scanning sheen. Evokes the live site's video banner without a
 * heavy video file. Swap in a real <Image> later by dropping it behind this.
 */
export function AmbientBanner({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest ${className}`}
      aria-hidden
    >
      <Image
        src="/banner.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1200px) 1072px, calc(100vw - 32px)"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/65 via-background/14 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />

      {/* Slow scanning sheen */}
      {!reduce && (
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />
      )}

      {/* Foreground content */}
      {children}
    </div>
  );
}
