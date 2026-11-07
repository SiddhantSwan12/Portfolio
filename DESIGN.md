---
name: Siddhant Swan Portfolio
description: A true-black, single-column developer portfolio where white type and hairline edges light the work and the tooling stays dim at the edges.
colors:
  surface: "#000000"
  surface-container-lowest: "#050506"
  surface-container-low: "#0d0d10"
  surface-container: "#121216"
  surface-container-high: "#19191d"
  surface-container-highest: "#222227"
  surface-variant: "#202024"
  surface-bright: "#25252a"
  primary: "#ffffff"
  on-primary: "#2f3131"
  on-surface: "#e4e1e6"
  on-surface-variant: "#c4c7c8"
  text-muted: "#8b8b94"
  border-subtle: "#1d1d22"
  outline: "#8e9192"
  outline-variant: "#444748"
  grid-line: "#242428"
  live: "#10b981"
  building: "#f59e0b"
  idle: "#71717a"
  error: "#ffb4ab"
  activity-0: "#19191d"
  activity-1: "#333337"
  activity-2: "#5d5f5f"
  activity-3: "#8e9192"
  activity-4: "#e4e1e6"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.333
  caption:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "0.05em"
rounded:
  cell: "2px"
  base: "4px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  unit: "4px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-phone: "96px"
  section-desktop: "128px"
  gutter-phone: "16px"
  gutter-desktop: "64px"
  header: "64px"
  touch-target: "44px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-container-low}"
  control-header:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "36px"
  control-header-hover:
    textColor: "{colors.on-surface}"
  nav-link:
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  nav-link-hover:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
  chip-tech:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "4px 10px"
  tag-experience:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "4px 8px"
  status-pill:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  card:
    backgroundColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "10px 12px"
  mobile-bar-item:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "56px"
---

# Design System: Siddhant Swan Portfolio

## Overview

**Creative North Star: "The Dark Workbench"**

A black bench under one lamp. The page is a single centred column on a true-black canvas, and the only thing lit is the work: white headings, soft-white copy, screenshots and the contribution grid. Everything that is tooling rather than work (the clock, the lofi player, the menu, the theme switch, the cursor ring) sits at the edges in header-sized, hairline-bordered controls set in muted mono, present but dim. The mood is **focused, confident, quiet**. Nothing shouts; hierarchy comes from scale, weight and tonal contrast, never from colour or decoration.

Density is airy but disciplined. Major sections stand 96 px apart on a phone and 128 px apart on a desk, so each reads as its own island, while inside a section the rhythm tightens to a 4 px grid with 40 px between heading and content. Structure is drawn with 1 px hairlines and tonal steps a few points apart; surfaces never float. The one accent is the absence of accent: pure white is the primary colour, spent on the name, headings and the single call to action, and the four status hues appear only as dots.

The bench has a day setting. The light theme is a full peer, not an afterthought: every token has a light value, the canvas becomes pure white, and the hero banner cross-fades from night to day. Phones are a first-class reader, so the system is specified at 320 px upward, with 44 px targets wherever the pointer is a finger. The look preserves the identity of the earlier "Technical Precision" system; what changed is the values, the contrast and the layout discipline.

**Key Characteristics:**
- True-black canvas (#000000) with cards a hair above it; depth by tone and hairline, never by shadow at rest.
- White as the only emphasis; colour reserved for 8 px status dots and the error state.
- Geist for reading, JetBrains Mono (one weight) for every label, control and datum.
- Hover brightens an edge; press scales to 95%; reveals rise 16 px once. One easing curve everywhere.
- A dotted 284 × 112 px lattice behind the page that the theme wipe, the generative covers and the banner all echo.
- Two themes with equal rigour, 44 px touch targets, reduced-motion respected throughout.

## Colors

A monochrome, near-grayscale system: eight tonal steps of near-black, three steps of off-white text, two edge greys, and four hues that only ever appear as small signals. Tokens are declared in the Tailwind `@theme` block of `src/app/globals.css`; the light theme redefines the same names on `html[data-theme="light"]`.

### Primary
- **Lamp White** (`primary`): The one source of light. Headings, the name, logo mark, active rail step, the filled timeline dot, and the fill of the primary button and the scroll progress bar. Spend it on at most one action per view.
- **Ink on White** (`on-primary`): The near-black text that sits on a white button; never pure black, so the button reads as a lit surface rather than a hole.

### Neutral
Surfaces, darkest to lightest:
- **True Black** (`surface`): The canvas, the header once scrolled (at 80% with 24 px blur), the phone action bar (at 85%). `background` is an alias of this token.
- **Bench Black** (`surface-container-lowest`): Every card, media frame, dialog, header control and status pill. It is only 2% above the canvas; the hairline does the separating.
- **Soot** (`surface-container-low`): Tech chips, skill chips, form fields, and the fill that appears under a hovered nav link or secondary button.
- **Charcoal** (`surface-container`): Keyboard-key badges, the skills count badge, the cover art backing, chip hover fill.
- **Graphite** (`surface-container-high`): Experience tags, the active palette row, the scrollbar thumb, and step 0 of the activity ramp.
- **Slate** (`surface-container-highest`) and **Iron Bright** (`surface-bright`): Defined to complete the ramp; unused on the page today.
- **Iron** (`surface-variant`): The fill of a hollow (past-role) timeline dot.

Text, brightest to dimmest:
- **Soft White** (`on-surface`): Default body copy, chip labels, the project row body. `on-background` is an alias.
- **Cool Gray** (`on-surface-variant`): Descriptions, bullets, secondary copy, the phone bar labels, the chevron and inline icons.
- **Pewter** (`text-muted`): Metadata, dates, captions, nav links at rest, placeholders. Chosen for 6.2:1 on True Black and 5.7:1 on Bench Black, so it is AA at 11 px.

Structure:
- **Hairline** (`border-subtle`): The workhorse 1 px edge on every card, control, chip, divider, the header and footer rules, the timeline rail and the dashed empty state.
- **Lit Edge** (`outline`): The edge a control takes on hover, the global focus ring, the active rail step, and the midpoint of the gradient seam above skills cells.
- **Dim Edge** (`outline-variant`): Hover edge for large cards (experience, writing), list markers, the cover lattice and scrollbar-thumb hover.
- **Grid Stitch** (`grid-line`): The 1 × 6 dash of the fixed background lattice, repeated every 284 × 112 px.

### Status (signal only)
- **Live Green** (`live`): A project is deployed and reachable. Also the availability pulse and the sent-message check.
- **Building Amber** (`building`): In progress.
- **Archive Zinc** (`idle`): No public build.
- **Error Rose** (`error`): Invalid-field borders and error copy; the one hue allowed on text.
- **Activity Ramp** (`activity-0` to `activity-4`): Five greys from Graphite to Soft White for the contribution calendar and its legend. Intensity is tone, not colour.

### Light theme
The same names, re-valued for a white bench. Canvas and header `#ffffff`; cards `#f7f7f5`; chips and fields `#efefec`; badges `#e7e7e3`; tags `#deded8`; highest `#d1d1ca`; variant `#d8d8d2`; bright `#fafaf8`. Primary flips to `#111114` with white on it; body text `#19191c`, secondary `#454548`, muted `#64646a`. Hairline `#dfdfda`, Lit Edge `#55555a`, Dim Edge `#b9b9b2`, lattice `rgba(17,17,20,0.2)` with a faint `rgba(17,17,20,0.035)` glow at the top of the page. Error becomes `#b3261e`. The activity ramp runs `#e7e7e3`, `#cfcfc8`, `#a8a8a0`, `#6f6f73`, `#19191c`. Status hues do not change.

### Named Rules
**The One Lamp Rule.** Pure white is emphasis, and emphasis is rare: the name, section headings, card titles, one primary button. Body text is Soft White, never white.

**The Dot-Only Colour Rule.** Live, Building and Archive hues appear as 8 px dots (and the 6 px availability pulse), never as fills, borders or text. Two exceptions: Error Rose inside the contact form, and Live Green on the sent-message check and one bar in seven of an escrow cover.

**The Hairline Rule.** Boundaries are 1 px of Hairline over a tonal step of at most two ramp positions. If a surface needs more separation than that, it is the wrong surface.

## Typography

**Display Font:** Geist (variable weight, via `next/font`; fallback ui-sans-serif, system-ui, sans-serif)
**Body Font:** Geist
**Label/Mono Font:** JetBrains Mono, loaded at a single weight (500); fallback ui-monospace, monospace

**Character:** A clean geometric sans carries everything a visitor reads; a monospace marks everything the interface says about itself. The pairing reads like a build tool rather than a magazine: tight headlines, relaxed body leading, and small mono labels that behave like telemetry.

### Hierarchy
- **Display** (700, 48 px / 1, −0.025em): The name only. Steps down to 36 px below 768 px and 30 px below 640 px.
- **Headline** (600, 30 px / 1.2, −0.025em): Section headings ("Selected work", "Experience"). Featured project titles use the same style at 24 px on phones and 30 px from 768 px. The contact dialog title is 24 px.
- **Title** (600, 20 px / 1.4): Card titles, employer names, "More projects". Compact project rows and school names use 16–18 px at the same weight.
- **Body** (400, 16 px / 1.625): Reading copy, bullets, descriptions. Lines are capped around 70ch in project rows and 42rem in the hero.
- **Body Lead** (400, 18 px / 1.625): The hero tagline and featured project descriptions from 768 px.
- **Label** (JetBrains Mono 500, 12 px / 1.333): Buttons, nav links, chips, tags, footer links, metadata, the palette. Not uppercase unless it is a caption.
- **Caption** (JetBrains Mono 500, 11 px, uppercase, +0.05em): Periods, issuers, calendar summary, the banner label and skill-group index ("01 / Top"). Tracking widens to 0.18em on the rail and the skills index and to 0.24em on cover labels. Keyboard badges are 10 px, the floor for interface text; the only smaller lettering (8–9 px) is decoration inside the generative covers, hidden from assistive tech.

### Named Rules
**The Mono Means Metadata Rule.** If the text is about the page (a label, a control, a date, a count, a shortcut), it is JetBrains Mono. If it is for reading, it is Geist. Never mix within one element.

**The Single-Weight Mono Rule.** Only JetBrains Mono 500 is shipped. Mono text never asks for bold or regular; emphasis in mono comes from colour (Pewter to Soft White to Lamp White), not weight.

**The Tight Headline Rule.** Every Geist heading at 24 px or larger carries −0.025em tracking. Body text keeps its natural tracking; captions widen.

## Layout

One centred column, 1200 px wide, with 16 px gutters on phones and 64 px from 768 px. The fixed header is 64 px tall and transparent until the page has scrolled 8 px, when it gains a hairline, an 80% True Black fill and a 24 px backdrop blur. Jump targets carry an 80 px scroll margin so a section never lands under the header. Behind everything a fixed dotted lattice repeats every 284 × 112 px; the theme wipe is built from tiles of the same size, aligned to it.

Vertical rhythm is a 4 px unit. Main sections are separated by 96 px on phones and 128 px from 768 px; within a section the heading sits 40 px above its content; cards use 16 px padding on phones, 20–24 px on wider screens. The hero starts 80 px below the top (96 px from 768 px) with a banner 144 px tall on phones, 160 px from 640 px and 208 px from 768 px.

Section grids, all collapsing to a single column below 768 px:
- **Selected work**: featured projects as full-width rows divided by hairlines, each a 12-column grid from 768 px with media in 5 columns and text in 7. Compact projects are native disclosure rows under a hairline list; no card grid of equal tiles.
- **Experience**: a vertical hairline rail inset 12 px, with each role a card 24–32 px to its right; 48 px between roles.
- **GitHub Activity**: one card holding the calendar. Phones show the last 26 weeks edge to edge; from 768 px the full 53 weeks render as 10 px cells.
- **Skills**: a bento of hairline-separated cells on a 2-column grid, the first group spanning both columns, each cell at least 176 px tall.
- **Education**: a 5-column grid, 2 for the degree card and 3 for the credential list.

Responsive behaviour is driven by three widths and one height. Below 768 px the header drops its links and résumé button; a fixed action bar (Projects / Résumé / Contact, 56 px items plus the safe-area inset) takes the bottom edge and the footer pads 88 px to clear it. On a viewport shorter than 440 px (a landscape phone) the bar hides. The section rail appears only from 1440 px, where there is a clear gutter beside the column. Where the pointer is coarse, every control grows to at least 44 × 44 px; with a mouse, header controls stay 36 px. The layout holds with no horizontal overflow from 320 px.

**The 44 px Rule.** Any element a thumb can tap is at least 44 px on its shorter side on a coarse pointer, including text links in the hero and footer, which get the height through padding, not font size.

## Elevation & Depth

The system is flat. Depth is tonal layering (a card is 2% lighter than the canvas) plus 1 px hairlines; nothing in the page flow casts a shadow, and hovering never lifts a surface. Interactivity is signalled by edges brightening (Hairline to Lit Edge or Dim Edge), text brightening (Pewter to Soft White), fills stepping one ramp position, and a 95% press scale.

Three exceptions exist, all off the page plane:

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5)`): The command palette only, over a `rgba(0,0,0,0.6)` scrim with an 8 px backdrop blur. The contact dialog uses the same scrim with no shadow.
- **Glyph glow** (`box-shadow: 0 0 24px rgba(255,255,255,0.05)`): The centre tile of a generative project cover, so it reads as lit from within rather than raised.
- **Banner label** (`text-shadow` equivalent `0 1px 18px rgba(0,0,0,0.45)` via box shadow on a translucent black pill): Keeps the label legible on the illustrated banner.

Translucency does the rest: the scrolled header and the phone action bar are True Black at 80–85% with a 24 px blur, and the hero clock and label sit on `rgba(0,0,0,0.35)` pills with an 8 px blur.

### Named Rules
**The Flat-at-Rest Rule.** In-page surfaces never carry a drop shadow, in either theme. If something must float, it is a modal, and it gets the Overlay shadow and the scrim.

**The Brightening Edge Rule.** Hover and focus change a colour, not a position: the border goes to Lit Edge, the text goes up one text step. Position changes are reserved for the press (scale 0.95) and the first-view reveal.

## Shapes

Four radii and a hairline. **4 px** (`base`) on the smallest things: chips, tags, keyboard badges, the logo mark, cover labels. **8 px** (`lg`) on controls: buttons, header controls, inputs, nav links, logo tiles, the skills count badge. **12 px** (`xl`) on containers: cards, media frames, dialogs, the banner, the skills bento, the calendar card. **Full** on anything that should read as a point or a pill: status pills, the availability pill, status dots, the avatar, timeline dots, the cursor ring, the rail steps. Calendar cells are 2 px.

Borders are 1 px of Hairline, never thicker, never doubled. Containers clip their contents (`overflow: hidden`), so media and gradients stop at the radius. The avatar circle, the timeline dots and the cursor ring are the only round forms; the rest is rectangles with soft corners.

Icons are drawn, not typed: a 24-unit grid, 2 px stroke (2.4 px on the small external-arrow glyph), round caps and joins, `currentColor`, hidden from assistive tech. Brand marks come from simple-icons as monochrome fills at 14–16 px. No unicode characters stand in for icons.

The page has a recurring geometry: the 284 × 112 px lattice behind it, the 284 × 112 px tiles of the theme wipe, and the dashed grids inside the generative covers are the same idea at three scales.

## Components

Precise and restrained: an instrument panel. Flat fills, hairline borders, edges that brighten on hover, 44 px targets under a thumb. Nothing lifts, nothing glows at rest. Every transition uses the premium curve `cubic-bezier(0.2, 0.8, 0.2, 1)`; colours take 150–300 ms, reveals 600 ms.

### Buttons
- **Shape:** Soft corners (8 px), 44 px tall on the page, 36 px in the header with a mouse (44 px with a finger). Label type in JetBrains Mono: 14 px for the hero pair, 12 px elsewhere.
- **Primary:** Lamp White fill with Ink on White text, 24 px side padding (16 px in the header). Hover drops to 90% opacity; press scales to 0.95. One per view: "Get in touch", or "Résumé" in the header.
- **Secondary:** Transparent with a Hairline border and Lamp White text, 20 px side padding. Hover fills Soot. "View résumé", "Cancel".
- **Link button:** Bench Black fill, Hairline border, Soft White text, 16 px side padding, with a leading brand mark ("Source") or a trailing 14 px arrow ("Live demo"). Hover brightens the border to Lit Edge and the text to Lamp White.
- **Header control:** Bench Black fill, Hairline border, Pewter text. Hover brightens edge and text. Used for the lofi, theme and search controls; the read-only clock shares the shell at 34 px.
- **Text link:** Pewter or Cool Gray mono, brightening to Lamp White; underline appears on hover with a 4 px offset. Links that leave the site open a new tab and, where they are actions, carry the arrow glyph.
- **Focus:** A 2 px Lit Edge outline, offset 2 px, on every control, from a single global `:focus-visible` rule; controls inside dense lists pull it inside with a −2 px offset. Buttons draw nothing extra.

### Status Pill
- **Style:** Full-radius capsule, Bench Black fill, Hairline border, 12 px side padding (10 px compact), an 8 px dot in the status hue, the status word in Lamp White (Live, Shipped) or Cool Gray (Building, Archived), then "· year" in Cool Gray.
- **Meaning:** The pill's tooltip defines the word: Live = deployed and reachable, Shipped = released, not hosted, Building = in progress, Archived = no public build.

### Chips and Tags
- **Tech chip:** Soot fill, Hairline border, 4 px radius, 4 × 10 px padding, 12 px mono in Soft White, with an optional 14 px brand mark in Cool Gray. In the skills section the chip takes 6 × 12 px padding and hover brightens its border and steps the fill to Charcoal.
- **Experience tag:** Borderless Graphite fill, 4 px radius, 4 × 8 px padding, 12 px mono in Cool Gray. Quieter than a chip because it is history, not a claim.
- **Keyboard badge:** Charcoal fill, Hairline border, 4 px radius, 10 px mono in Cool Gray; hidden on coarse pointers.

### Cards and Containers
- **Corner style:** 12 px.
- **Background:** Bench Black on the canvas. Inside a card, nested elements use Soot or Charcoal.
- **Border:** 1 px Hairline; large cards (experience, writing) brighten it to Dim Edge on hover. The empty-state card uses a dashed Hairline.
- **Shadow strategy:** None (see Elevation).
- **Internal padding:** 16 px on phones, 20 px from 640 px, 24 px from 768 px.
- **Media frame:** 1.48:1 aspect, 12 px radius, Hairline border, Bench Black backing; screenshots are contained, not cropped. With no screenshot a generative cover fills it.
- **Skills bento:** Cells separated by 1 px gaps of Hairline colour inside one 12 px rounded frame, each with a faint Lit Edge gradient seam along its top and a 40 px Charcoal count badge.
- **Logo tile:** 56–64 px, 8 px radius, Hairline border, pure white fill with 6–8 px padding so employer marks keep their own colours.

### Inputs and Fields
- **Style:** Soot fill, Hairline border, 8 px radius, 10 × 12 px padding, 16 px Geist in Soft White, Pewter placeholder, Lamp White caret. Labels are 12 px uppercase mono captions in Pewter above the field.
- **Focus:** Border steps to Lit Edge and the global outline appears at a 1 px offset.
- **Error:** Border becomes Error Rose, a 12 px Error Rose message appears below, and an alert panel (Error Rose border at 40%, fill at 10%) explains the failure and offers a mailto fallback.
- **Disabled / sending:** 50% opacity, no press scale.
- **Palette search:** Borderless except a bottom Hairline, transparent fill, 14 px mono, an inset 2 px Lit Edge ring on focus.

### Navigation
- **Header:** Fixed, 64 px, the column's gutters. Logo mark (28 px, 4 px radius, Hairline, `</>` in mono) and handle on the left; from 768 px four anchor links (Projects, Experience, Activity, Skills) as nav links; on the right the clock (from 640 px), lofi, theme, menu/search and, from 768 px, the primary Résumé button. Links show the hash in the URL and work with middle-click.
- **Menu / search button:** One header control with two faces: a three-line menu glyph below 640 px, "Search" with a magnifier and a keyboard badge reading "Ctrl K" or "⌘K" above it.
- **Command palette:** A 512 px dialog 12vh from the top (18vh from 640 px), 12 px radius, Bench Black, Hairline, the Overlay shadow and scrim. Rows are 44 px tall with the label in Soft White and a mono hint in Pewter; the active row fills Graphite. Digit shortcuts 1–6 jump to sections only while the box is empty, and the legend that lists them hides on coarse pointers. Opens in 150–180 ms with an 8 px rise.
- **Phone action bar:** Fixed to the bottom below 768 px, True Black at 85% with 24 px blur and a top Hairline, three equal items (icon above a 12 px mono label) 56 px tall plus the safe-area inset; pressing fills Soot. Hidden below 440 px of height.
- **Section rail:** From 1440 px, six 28 px numbered circles down the right edge; the active one brightens to Lit Edge and Lamp White, scales to 1.08 and slides out an 11 px uppercase label.
- **Scroll progress:** A 2 px Lamp White bar across the top, spring-smoothed.

### Timeline
A 1 px Hairline rail with 12 px dots that punch through it on a 4 px ring of the canvas colour. The current role is a solid Lamp White dot; past roles are hollow Iron with a Hairline border.

### Contribution Calendar
Seven rows of square cells on a 3–4 px gap, coloured from the Activity Ramp, with a "Less … More" legend of 10 px swatches. The card states the year's total and repo count, or, when GitHub is rate-limiting, a plain note over an empty grid of the same shape.

### Signature Components
- **Theme toggle and pixel wipe:** A 36 px header control whose glyph slides between a filled and a hollow circle. Pressing it plays a synthesised keyboard "thock" and tiles the viewport in 284 × 112 px cells of the incoming canvas colour, staggered up to 150 ms by distance from the button (outward to light, inward to dark), each tile scaling and un-tilting over 560 ms. The theme swaps under the wipe.
- **Ambient banner:** The hero's 12 px-radius frame holding a day and a night illustration; the night layer fades in over 1.2 s with the theme, under a left-to-right darkening gradient and a 10 s sheen that sweeps every 14 s. On it sit the availability pill (pulsing Live Green dot), a 16–30 px tabular clock with 0.2–0.28em tracking, and the mono banner label.
- **Generative cover:** For projects without a screenshot. A Charcoal field with a dashed Dim Edge lattice, 28–34 breathing bars in Cool Gray (every seventh in Live Green for escrow), labelled corner badges, and a centre tile that drifts 2 px; the whole cover tilts up to 7° toward the pointer on a spring and scales 1.5% on hover.
- **Custom cursor:** Only with a fine pointer and motion allowed. An 8 px Lamp White dot that follows exactly and a 36 px ring that lags on a softer spring, both in difference blend; over an interactive element the dot grows to 1.35× and the ring to 1.75×.
- **Lofi button:** A header control with a three-bar equaliser that animates while playing; below 768 px it appears only while music plays, so a phone always has a one-tap pause.
- **Reveal:** Sections and cards rise 16 px and fade in once over 600 ms when 12% into view; lists stagger children by 60 ms. Reduced motion disables every animation, transition and smooth scroll.

## Do's and Don'ts

### Do:
- **Do** build every container as Bench Black with a 1 px Hairline and a 12 px radius, and every control as an 8 px-radius surface that brightens its edge to Lit Edge on hover.
- **Do** give any tappable element at least 44 px on a coarse pointer, using padding on text links so the type size stays 12 px.
- **Do** use `cubic-bezier(0.2, 0.8, 0.2, 1)` for every transition and check `prefers-reduced-motion` before any animation, including springs and infinite loops.
- **Do** keep Pewter for 11–12 px metadata only on True Black or Bench Black, where it holds 5.7:1 or better.
- **Do** mark a link that leaves the site with the 14 px arrow glyph and open it in a new tab; keep in-page navigation as real anchors.
- **Do** define both theme values for any new token, in the `@theme` block and the `html[data-theme="light"]` override.
- **Do** draw new icons on the 24-unit grid at a 2 px stroke in `currentColor`, and take brand marks from simple-icons.
- **Do** keep JetBrains Mono at weight 500 and reserve it for labels, controls and data.

### Don't:
- **Don't** add a drop shadow, gradient fill or glow to a surface in the page flow, in either theme; only the palette overlay and the cover glyph carry shadows.
- **Don't** use Live Green, Building Amber or Archive Zinc as a fill, border or text colour; they are 8 px dots.
- **Don't** put an eyebrow, index number or decorative label above a section heading; the heading carries its own weight.
- **Don't** lay projects out as a grid of identical cards; featured work gets the 5/7 row and the rest the disclosure list.
- **Don't** set interface text below 10 px, or anything a visitor must read below 11 px; only decorative lettering inside a cover may go smaller.
- **Don't** type a unicode arrow, bullet or emoji where an icon belongs.
- **Don't** fire single-key shortcuts outside the open palette, or focus a text field when the dialog opens on a touch screen.
- **Don't** introduce a second accent hue or a brand colour; emphasis is Lamp White and rarity.
