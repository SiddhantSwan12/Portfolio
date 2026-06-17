"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Dual-image hero banner with a smooth day ↔ night crossfade.
 *
 * Both images are stacked; the night layer sits on top and its opacity is
 * driven by the current theme. The transition is a slow, cinematic
 * crossfade — the samurai scene morphs from day to night (and back)
 * without any visible cut.
 */
export function AmbientBanner({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.dataset.theme !== "light");
    };
    check();

    window.addEventListener("theme-change", check);
    window.addEventListener("storage", check);

    // Also observe attribute changes on <html> for the initial script
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("theme-change", check);
      window.removeEventListener("storage", check);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest ${className}`}
      aria-hidden
    >
      {/* Day layer (always rendered, always visible as base) */}
      <Image
        src="/banner.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1200px) 1072px, calc(100vw - 32px)"
        className="object-cover object-center"
      />

      {/* Night layer — opacity crossfade driven by theme */}
      <Image
        src="/banner_night.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1200px) 1072px, calc(100vw - 32px)"
        className="object-cover object-center"
        style={{
          opacity: isDark ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />

      {/* Gradient overlays for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to right, rgba(19,19,22,0.65), rgba(19,19,22,0.14), rgba(19,19,22,0.10))"
            : "linear-gradient(to right, rgba(255,255,255,0.55), rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
          transition: "background 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(19,19,22,0.55), transparent, transparent)"
            : "linear-gradient(to top, rgba(255,255,255,0.45), transparent, transparent)",
          transition: "background 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />

      {/* Slow scanning sheen */}
      {!reduce && (
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background: isDark
              ? "linear-gradient(to right, transparent, rgba(255,255,255,0.16), transparent)"
              : "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
            transition: "background 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />
      )}

      {/* Foreground content */}
      {children}
    </div>
  );
}
