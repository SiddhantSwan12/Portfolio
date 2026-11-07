# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences carry equal weight (confirmed):

- **Recruiters and hiring managers** screening for Software Engineer, AI/ML Engineer or Full-Stack roles. They skim, often on a phone, and decide quickly whether to open the resume or send a message.
- **Interviewing engineers** who want to judge the work itself. They open a project, follow its Source link and read code.

Success is any of: a message through the contact form or email, a resume open, or a repository visit. Typical arrival paths are the resume PDF, LinkedIn, the GitHub profile README and links pasted into applications. [inferred from how the site is referenced, not confirmed]

## Product Purpose

A single-page personal portfolio for Siddhant Swan, a 2026 B.Tech graduate (Electronics & Telecommunication, VIT Pune) seeking a full-time software role. It exists to turn a resume line into a credible, verifiable body of shipped work and to make contacting him effortless. Live at https://siddhantswan.vercel.app.

## Positioning

He ships end to end: deployed, authenticated, latency-measured systems rather than notebooks or tutorials (confirmed). Every project claim on the site should therefore be verifiable by a visitor through a live deployment, a source repository, or both. Where neither exists, the site says so rather than implying otherwise.

## Operating Context

- Content lives in `src/lib/content.ts`, the single source of truth. `CONTENT.md` is the original build brief. `DESIGN.md` documents the visual system as shipped (regenerated 2026-11-07 by `/impeccable document`); its machine-readable sidecar is `.impeccable/design.json`.
- Deployed on Vercel from the `main` branch of github.com/SiddhantSwan12/Portfolio. Dev server: `npm run dev` on port 3000; production check: `npm run build` then `npm run start`.
- The GitHub Activity section fetches public GitHub data server-side with hourly revalidation and degrades to an empty grid when the unauthenticated API rate-limits.
- The contact form posts to Web3Forms with a public access key; the resume is served from `public/resume.pdf`.
- Two live demos sleep on free tiers (Render for FairWork, Streamlit Community Cloud for the quant dashboard) and take 20–60 seconds to wake; their cards say so.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, framer-motion, simple-icons, TypeScript.
- Sections in order: hero, experience (four roles), projects (eight cards), GitHub activity, skills, education and credentials, footer. Dark and light themes, persisted in localStorage.
- Facts on the site must match `public/resume.pdf` for titles, dates and figures.
- Project status vocabulary: **Live** = deployed and reachable; **Shipped** = released but not hosted (an installer, a local lab); **Archived** = no public build.
- Open: the resume links a different LinkedIn slug than the site, and the X handle on the site was taken from the GitHub profile README; both need the owner's confirmation.
- Open: whether a Writing section returns (the component is kept, no posts exist), and whether Rust/Tauri and security tooling join the Skills section.

## Brand Commitments

None are binding (confirmed). The illustrated avatar (a One Piece character), the samurai banner, the lofi player and the keyboard-sound theme toggle are all open to change in future work. The name, email address and social handles are facts, not brand choices.

## Evidence on Hand

- `public/resume.pdf`: the authoritative record of roles, dates, figures and certifications.
- `public/projects/`: screenshots for Athena.ai, FairWork, Traffic Intelligence and Quorum. No screenshots yet for OpenDictate, SecureWallet, the Quant Analytics Dashboard or CommunityAI; generative covers stand in.
- `public/logos/`: employer and university marks (Enovate, Geeks Solutions, Grant Thornton, Mignited, VIT Pune).
- `public/profilePhoto.png` is an illustrated avatar, not a photograph. `public/banner.jpg` and `public/banner_night.png` are an illustrated scene whose provenance is unrecorded.
- Live demos and repositories are listed per project in `src/lib/content.ts`; the GitHub profile README at github.com/SiddhantSwan12 carries the same project claims and figures.
- Not on hand: testimonials, press, client logos, or usage metrics beyond the self-reported figures in the resume. Future work must not fabricate them.

## Product Principles

1. **Verifiable over impressive.** Every claim links to something a visitor can open; a claim that cannot be opened is stated as such or left out.
2. **The work leads.** Anything on the page that competes with the projects for attention must justify itself against the two audiences' jobs.
3. **Current by default.** Dates, availability and the newest work stay in sync with GitHub and the resume; stale copy costs more than less copy.
4. **One pass serves both audiences.** A recruiter can act within a minute and an engineer can go deep without leaving for a second site.
5. **Phones are a first-class reader**, not a fallback.
