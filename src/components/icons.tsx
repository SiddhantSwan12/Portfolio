import type { SVGProps } from "react";

/**
 * The handful of interface glyphs the page draws itself.
 * One stroke weight, 24-unit grid, currentColor; brand marks come from simple-icons via SkillIcon.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 16, ...rest }: IconProps): SVGProps<SVGSVGElement> {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...rest,
  };
}

/** External link / opens elsewhere. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2.4, size: 14, ...props })}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/** Expand / collapse affordance for native <details>. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Opens the command palette on small screens, where it doubles as the site menu. */
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

/** Search affordance on the palette button at wider widths. */
export function SearchIcon(props: IconProps) {
  return (
    <svg {...base({ size: 14, ...props })}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** Rectangle-with-lines glyph for the résumé action. */
export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

/** Envelope glyph for the contact action. */
export function MailIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/** Stacked panels glyph for the projects action. */
export function GridIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="14" width="8" height="6" rx="1.5" />
      <rect x="14" y="14" width="7" height="6" rx="1.5" />
    </svg>
  );
}
