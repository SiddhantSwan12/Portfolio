"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import type { ProjectCover as CoverKind, ProjectCoverCopy } from "@/lib/content";

type Variant = "assistant" | "community" | "escrow";

const VARIANT: Record<CoverKind, Variant> = {
  orbits: "assistant",
  mesh: "escrow",
  waveform: "community",
};

const DEFAULT_COPY: Record<CoverKind, ProjectCoverCopy> = {
  orbits: { left: "Input", right: "Output", center: "AI", footer: ["Ingest", "Reason", "Answer"] },
  mesh: { left: "Client", right: "Builder", center: "Escrow", footer: ["Contract", "Milestone", "Release"] },
  waveform: { left: "Voice in", right: "Actions out", center: "AI", footer: ["Transcript", "Minutes", "Moderation"] },
};

export function ProjectCover({
  className = "h-52",
  kind,
  label,
  copy,
}: {
  className?: string;
  kind: CoverKind;
  label: string;
  copy?: ProjectCoverCopy;
}) {
  const reduce = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 22, mass: 0.4 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateX.set(py * -7);
    rawRotateY.set(px * 7);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      className={`relative overflow-hidden border-b border-border-subtle bg-surface-container [perspective:900px] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% -30%, var(--color-surface-container-high), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-85 transition-opacity duration-500 group-hover:opacity-100"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <SignalCover variant={VARIANT[kind]} copy={copy ?? DEFAULT_COPY[kind]} />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/28 to-transparent p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
          {label}
        </span>
        <span className="grid size-7 place-items-center rounded border border-border-subtle bg-surface-container-lowest/80 font-mono text-[10px] text-primary">
          3D
        </span>
      </div>
    </motion.div>
  );
}

function SignalCover({ copy, variant }: { copy: ProjectCoverCopy; variant: Variant }) {
  const reduce = useReducedMotion();
  const bars = Array.from({ length: variant === "escrow" ? 28 : 34 });
  const speed = variant === "escrow" ? 2.6 : 2.2;

  return (
    <div className="relative flex size-full items-center justify-center px-6">
      <div className="absolute inset-0 opacity-45">
        <svg viewBox="0 0 200 120" className="size-full" preserveAspectRatio="none">
          <PatternGrid />
        </svg>
      </div>
      <div className="absolute left-6 top-6 rounded border border-border-subtle bg-surface-container-lowest px-2 py-1 font-mono text-[9px] uppercase text-text-muted">
        {copy.left}
      </div>
      <div className="absolute right-6 bottom-6 rounded border border-border-subtle bg-surface-container-lowest px-2 py-1 font-mono text-[9px] uppercase text-text-muted">
        {copy.right}
      </div>
      <div className="absolute left-6 bottom-7 hidden gap-1.5 sm:flex">
        {copy.footer.map((item, index) => (
          <motion.span
            key={item}
            className="rounded border border-border-subtle bg-surface-container-lowest/80 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-text-muted"
            animate={reduce ? undefined : { opacity: [0.42, 1, 0.42], y: [0, -2, 0] }}
            transition={{ duration: 2.4, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
          >
            {item}
          </motion.span>
        ))}
      </div>
      <div className="flex h-20 items-center justify-center gap-[3px]">
        {bars.map((_, i) => {
          const wave = variant === "escrow" ? Math.cos(i * 0.64) : Math.sin(i * 0.7);
          const base = 12 + Math.abs(wave) * (variant === "assistant" ? 58 : 54);
          return (
            <motion.span
              key={i}
              className={`w-[3px] rounded-full ${
                variant === "escrow" && i % 7 === 0 ? "bg-live" : "bg-on-surface-variant"
              }`}
              style={{ height: base }}
              animate={reduce ? undefined : { scaleY: [0.5, 1, 0.62, 1, 0.5], opacity: [0.42, 1, 0.55, 1, 0.42] }}
              transition={{
                duration: speed + (i % 5) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
            />
          );
        })}
      </div>
      <motion.div
        className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-border-subtle bg-surface-container-lowest font-mono text-[10px] uppercase tracking-wider text-primary shadow-[0_0_24px_rgba(255,255,255,0.05)]"
        animate={reduce ? undefined : { scale: [1, 1.04, 1], y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {copy.center}
      </motion.div>
    </div>
  );
}

function PatternGrid() {
  return (
    <g opacity="0.42">
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={`h-${i}`}
          d={`M0 ${20 + i * 16} H200`}
          stroke="var(--color-outline-variant)"
          strokeWidth="0.35"
          strokeDasharray="1 7"
        />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={`v-${i}`}
          d={`M${20 + i * 28} 0 V120`}
          stroke="var(--color-outline-variant)"
          strokeWidth="0.35"
          strokeDasharray="1 7"
        />
      ))}
    </g>
  );
}
