"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
] as const;

export function InteractiveLayer() {
  return (
    <>
      <SmoothCursor />
      <ScrollProgress />
    </>
  );
}

function SmoothCursor() {
  const reduce = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useSpring(0, { stiffness: 420, damping: 34, mass: 0.35 });
  const cursorY = useSpring(0, { stiffness: 420, damping: 34, mass: 0.35 });
  const ringX = useSpring(0, { stiffness: 150, damping: 24, mass: 0.55 });
  const ringY = useSpring(0, { stiffness: 150, damping: 24, mass: 0.55 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      setVisible(true);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
    };
    const pointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setHovering(Boolean(target.closest("a, button, input, textarea, select, [role='button']")));
    };
    const pointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", pointerOver, true);
    document.documentElement.addEventListener("mouseleave", pointerLeave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", pointerOver, true);
      document.documentElement.removeEventListener("mouseleave", pointerLeave);
    };
  }, [cursorX, cursorY, reduce, ringX, ringY]);

  if (reduce) return null;

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[80]" aria-hidden>
      <motion.div
        className="fixed left-0 top-0 size-2 rounded-full bg-primary mix-blend-difference"
        style={{ x: cursorX, y: cursorY, marginLeft: -4, marginTop: -4 }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.35 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        className="fixed left-0 top-0 size-9 rounded-full border border-primary/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, marginLeft: -18, marginTop: -18 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.75 : 1,
          borderWidth: hovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.22 }}
      />
    </div>
  );
}

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.35 });
  const [active, setActive] = useState<(typeof SECTIONS)[number]["id"]>(SECTIONS[0].id);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 },
      );
      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-primary"
        style={{ scaleX }}
        aria-hidden
      />
      <nav
        className="pointer-events-none fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
        aria-label="Scroll sections"
      >
        {SECTIONS.map((section, index) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="pointer-events-auto group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
            >
              <motion.span
                className="overflow-hidden whitespace-nowrap"
                animate={{
                  width: isActive ? 88 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: reduce ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {section.label}
              </motion.span>
              <motion.span
                className="grid size-7 place-items-center rounded-full border border-border-subtle bg-surface-container-lowest text-[9px]"
                animate={{
                  borderColor: isActive ? "var(--color-outline)" : "var(--color-border-subtle)",
                  color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: reduce ? 0 : 0.22 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
