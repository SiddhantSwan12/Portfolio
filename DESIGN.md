# Design System: Single-Page Portfolio Clone
**Project ID:** projects/6704597336278533426
**Source screen:** "Ashutoshx7 Portfolio" · Mobile-first (780px canvas) · Dark mode

---

## 1. Visual Theme & Atmosphere

A **dark, developer-centric portfolio** built around the philosophy of *Technical Precision*. The mood is **focused, confident, and quiet** — deep near-black surfaces turn the content itself into the only source of light. It reads like a modern build tool or developer SaaS (Vercel / Linear lineage): high-contrast typography, generous breathing room, and rigid geometric structure softened by gently rounded corners.

Density is **airy but disciplined** — content sits in a single centered column with large vertical gaps (`gap-24`) between major sections, so each block feels like its own island. Nothing shouts; hierarchy is established through scale and tonal contrast rather than color or decoration. The signature accent is **the absence of accent** — pure white is the "primary," used as a spotlight on the most important text and actions.

---

## 2. Color Palette & Roles

A monochromatic, near-grayscale system. Color is functional, never decorative.

**Foundation (surfaces, darkest → lightest):**
- **Void Black** (`#131316`) — `background` / `surface`. The foundational canvas behind everything.
- **Ink Black** (`#0e0e11`) — `surface-container-lowest`. Pushed *darker* than the canvas to seat project cards and social pills with quiet depth.
- **Charcoal** (`#1b1b1e`) — `surface-container-low`. Skill chips and subtle hover fills.
- **Slate** (`#1f1f22`) — `surface-container`. Image-frame backgrounds inside cards.
- **Graphite** (`#2a2a2d`) — `surface-container-high`. Experience tags and project status badges.
- **Iron** (`#353438`) — `surface-container-highest` / `surface-variant`. Inactive timeline dots.

**Content / text:**
- **Pure White** (`#ffffff`) — `primary`. Headings, logo, the single most important text. The "lighthouse."
- **Soft White** (`#e4e1e6`) — `on-background` / `on-surface`. Default body copy on dark.
- **Cool Gray** (`#c4c7c8`) — `on-surface-variant`. Secondary body and list text.
- **Muted Zinc** (`#71717A`) — `text-muted`. Metadata, dates, captions, de-emphasized labels.

**Structure:**
- **Hairline Border** (`#27272A`) — `border-subtle`. The workhorse 1px edge on nav, cards, chips, dividers, and avatar.
- **Outline** (`#8e9192`) — `outline` / `outline-variant` (`#444748`). Brighter edge revealed on hover to signal interactivity.

**Status accents (used *only* as small signal dots, not surfaces):**
- **Live Green** (`#10b981`) — project is shipped/live.
- **Building Amber** (`#f59e0b`) — project in progress.
- **Muted Zinc** (`#71717A`) — not started.

> **Note:** `on-primary` is `#2f3131` (near-black) — text/icons placed *on* a white primary button, never pure black.

---

## 3. Typography Rules

Typography is the cornerstone of the system, pairing a clean geometric sans with a monospace for technical signaling.

- **Geist** — headings and body. Systematic, legible, modern.
- **JetBrains Mono** — all labels, tags, buttons, and metadata. Reinforces the developer narrative; this is the system's "technical accent."

**Scale & character:**
- **Headline XL** — 48px / weight 700 / line-height 1.1 / letter-spacing **−0.02em**. Hero name only; tight tracking for a "locked," authoritative look.
- **Headline LG** — 32px / 600 / −0.02em. Section titles ("Experiences", "Projects").
- **Headline MD** — 20px / 600. Card titles, job titles, logo.
- **Body LG** — 18px / 400 / line-height 1.6. Lead/intro text and pull-quotes.
- **Body MD** — 16px / 400 / line-height 1.6. Standard reading copy and bullet lists.
- **Label MD** — 14px / 500 / **+0.02em**, JetBrains Mono. Buttons and primary links.
- **Label SM** — 12px / 500, JetBrains Mono. Chips, tags, status badges, footer links.

**Conventions:** Labels are frequently **UPPERCASE with wide tracking** (`tracking-wider` / `tracking-widest`) for section eyebrows and the footer attribution. Generous 1.6 line-height on all body text preserves the "breathing room." On mobile, headline sizes step down ~20–25% (a dedicated `headline-lg-mobile` at 24px exists).

---

## 4. Component Stylings

- **Buttons:**
  - *Primary* — solid **white** fill, near-black text (`on-primary`), `rounded-lg` (0.5rem), Label MD mono. Hover dims opacity / shifts to `surface-tint`; press triggers `active:scale-95`.
  - *Secondary* — transparent fill with a `border-subtle` hairline and white text; hover fills to `surface-container-low`.

- **Project Cards:** `surface-container-lowest` (`#0e0e11`) background inside a `border-subtle` hairline, `rounded-xl` (0.75rem), overflow-hidden. A 256px image header sits behind a bottom hairline on a `surface-container` backing; the image rests at **80% opacity and brightens to 100% on hover** while the card's border lifts from `border-subtle` to `outline-variant`. Body padding is 24px (`p-6`) with a title + status badge row and muted description. Two-up grid on desktop, single column on mobile.

- **Status Badges:** small `surface-container-high` capsules, `rounded`, hairline border, Label SM, prefixed by a colored signal dot (green/amber/zinc — see §2).

- **Chips / Tags:**
  - *Skills* — `surface-container-low` fill, hairline border, `rounded`, Label SM.
  - *Experience tags* — borderless `surface-container-high` fill, `rounded`, Label SM in muted gray.
  - *Social pills* — `surface-container-lowest` fill, hairline border, `rounded-md`; hover brightens border to `outline`.

- **Avatar:** 96px, **fully circular** (`rounded-full`), hairline border — the one organic shape anchoring the otherwise geometric layout.

- **Timeline (Experiences):** a vertical `border-subtle` rail with absolute-positioned dots. The current/active role uses a **solid white dot**; past roles use a hollow `surface-variant` dot with a hairline border. Each dot wears a 4px `ring-background` halo to punch cleanly through the rail.

- **Navigation:** fixed top bar, full-width, `surface` background with a bottom hairline, 64px tall. Mono logo with a filled `terminal` Material Symbol on the left; a single white "Resume" button on the right.

- **Footer:** top hairline divider over `surface`; three-column (logo + copyright / italic pull-quote + attribution / link list). Footer links are muted, brightening to white on hover.

- **Inputs/Forms:** minimalist — 1px `border-subtle`, dark fill; focus state brightens the border toward white (the Tailwind `forms` plugin is loaded).

---

## 5. Layout Principles

- **Single centered column**, capped at `container-max` (1200px), centered with `mx-auto`.
- **Margins:** 16px on mobile (`margin-mobile`), 64px on desktop (`margin-desktop`).
- **Vertical rhythm:** a 4px base unit. Major sections are separated by very large gaps (`gap-24` ≈ 96px); intra-section spacing uses `gap-8` (32px); content offset from the fixed nav via `pt-32`.
- **Grid:** projects use a responsive 1→2 column grid (`grid-cols-1 md:grid-cols-2`, `gap-6`). Mobile reflows everything to a single column.
- **Depth strategy:** **no drop shadows.** Layering is achieved purely through tonal surface shifts and 1px hairline borders. Interactivity is signaled by *brightening borders* and *opacity/scale micro-interactions* — never elevation. Boundaries should be felt as edges of light against the black canvas, not as floating panels.

---

## 6. Prompting Notes for Stitch

When generating new screens to match this system:
- Lead with **"dark, developer-centric, technical-precision"** and name **Geist** (headings/body) + **JetBrains Mono** (labels/tags).
- Keep the canvas `#131316`; seat cards *darker* at `#0e0e11`; separate everything with `#27272A` hairlines — **no shadows**.
- Use **pure white sparingly** as the only emphasis; everything else lives in the gray scale.
- Reserve color strictly for **small status dots** (green = live, amber = building, zinc = not started).
- Favor **uppercase mono micro-labels**, generous whitespace, rounded-lg/xl corners, and hover states that brighten borders rather than lift surfaces.
