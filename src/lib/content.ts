// Single source of truth for portfolio content. CONTENT.md is the original brief;
// where they differ, this file wins.

export const siteUrl = "https://siddhantswan.vercel.app";

export const profile = {
  name: "Siddhant Swan",
  handle: "SiddhantSwan",
  headline: "Software Engineer · Backend & GenAI",
  subheadline: "Python · FastAPI · LLMs · Next.js — building real-world AI systems.",
  availability: "Open to SWE / AI roles",
  tagline:
    "I build backend and GenAI systems end to end: RAG pipelines, LLM products, and the APIs and interfaces that ship them. B.Tech in Electronics & Telecommunication from VIT Pune, class of 2026.",
  intro: [
    "Most recently I built production API features at Enovate IT and triaged SIEM alerts as a SOC analyst intern at Geeks Solutions. Looking for full-time Software Engineer, AI/ML Engineer or Full-Stack roles.",
  ],
  email: "swansiddhant9@gmail.com",
  resumeUrl: "/resume.pdf",
  avatar: "/profilePhoto.png",
};

export type SocialLink = { label: string; href: string };
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/SiddhantSwan12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhantswan/" },
  { label: "X", href: "https://x.com/Siddhant_Swan" },
  { label: "Instagram", href: "https://www.instagram.com/siddhant.swan/" },
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  active?: boolean;
  logo: {
    initials: string;
    wordmark: string;
    src: string;
  };
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    org: "Enovate IT Outsourcing Pvt. Ltd.",
    role: "Python Developer Intern",
    period: "Jan 2026 — Mar 2026",
    location: "Pune",
    logo: { initials: "E", wordmark: "Enovate", src: "/logos/enovate.png" },
    bullets: [
      "Built and extended 5+ backend features in a production codebase with Python, FastAPI and Django REST Framework, under senior-engineer guidance.",
      "Debugged and refactored 3 DRF API endpoints, cutting average response time by ~20% and improving readability for long-term maintenance.",
      "Delivered across 2 agile sprints with daily standups, shipping assigned tasks on schedule through the 3-month contract.",
    ],
    tags: ["Python", "FastAPI", "DRF", "REST"],
  },
  {
    org: "Geeks Solutions",
    role: "SOC Analyst Intern",
    period: "Jul 2025 — Dec 2025",
    location: "Nashik",
    logo: { initials: "GS", wordmark: "Geeks", src: "/logos/geeks-solutions.png" },
    bullets: [
      "Monitored and triaged SIEM-flagged security alerts daily, averaging 80+ alerts a week across multiple threat categories.",
      "Wrote Python scripts to automate parts of the log-review process, reducing time spent on manual checks by ~35%.",
      "Applied Cyber Threat Intelligence (arcX CTI 101) in daily analyst work, reviewing 500+ log entries over the internship.",
    ],
    tags: ["Python", "SOC", "SIEM", "Threat Intel"],
  },
  {
    org: "Grant Thornton China (致同)",
    role: "Business Development Outreach Consultant",
    period: "Oct 2024 — Nov 2024",
    location: "Remote",
    logo: { initials: "GT", wordmark: "Grant Thornton", src: "/logos/grant-thornton.png" },
    bullets: [
      "Ran outreach research targeting prospective clients across APAC markets.",
      "Drafted prospect lists and briefing notes used by senior consultants for client conversations.",
      "Worked cross-culturally across India–China time zones.",
    ],
    tags: ["BD Strategy", "APAC", "Research"],
  },
  {
    org: "Mignited Technologies and Solutions Pvt. Ltd.",
    role: "Intern",
    period: "Jul 2024 — Aug 2024",
    location: "Pune",
    logo: { initials: "MT", wordmark: "Mignited", src: "/logos/mignited.png" },
    bullets: ["Early hands-on software internship."],
    tags: ["Software"],
  },
];

export type ProjectStatus = "Live" | "Shipped" | "Building" | "Archived";
export type ProjectCover = "orbits" | "mesh" | "waveform";
export type ProjectCoverCopy = { left: string; right: string; center: string; footer: string[] };
export type Project = {
  name: string;
  status: ProjectStatus;
  year: string;
  /** One line for the compact list; the description carries the depth. */
  summary: string;
  description: string;
  tech: string[];
  cover: ProjectCover;
  coverCopy?: ProjectCoverCopy;
  image?: string;
  href?: string;
  hrefLabel?: string;
  repo?: string;
  note?: string;
  /** Featured projects get the full treatment at the top of the section. */
  featured?: boolean;
};

/** Stable DOM id for a project, so the menu can jump straight to it. */
export const projectId = (name: string) =>
  `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export const projects: Project[] = [
  {
    name: "Traffic Intelligence",
    status: "Live",
    year: "2026",
    featured: true,
    summary: "Drone-footage traffic analysis with persistent vehicle tracking and a web dashboard.",
    description:
      "Drone-footage traffic analysis built for the FlytBase Visual Hackathon. VisDrone-trained YOLO detections are tracked into persistent IDs through occlusion and crossing paths, parked vehicles are suppressed, and seven transport modes are resolved (LGV vs HGV by measured length). Ships annotated video, per-frame CSV and a report, surfaced in a web dashboard.",
    tech: ["Python", "PyTorch", "Ultralytics YOLO", "OpenCV", "pandas", "FFmpeg"],
    cover: "orbits",
    coverCopy: { left: "Drone feed", right: "Tracks out", center: "YOLO", footer: ["Detect", "Track", "Report"] },
    image: "/projects/traffic-intelligence.jpg",
    href: "https://traffic-analysis-agent.vercel.app",
    repo: "https://github.com/SiddhantSwan12/Traffic_Analysis_Agent",
  },
  {
    name: "Quorum",
    status: "Live",
    year: "2026",
    featured: true,
    summary: "Trading terminal with a multi-agent research pipeline for US and Indian stocks.",
    description:
      "Trading terminal for US and Indian listings with the TradingAgents multi-agent pipeline wired into every symbol page. React + Vite front end over a FastAPI bridge for Yahoo Finance bars and streamed agent runs; discovers annual reports via SEC EDGAR and Screener, cites uploaded PDFs in agent runs, persists alerts to SQLite, and includes ratio analysis and a backtest lab.",
    tech: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "SQLite", "TradingAgents"],
    cover: "mesh",
    coverCopy: { left: "Market data", right: "Agent verdict", center: "Quorum", footer: ["Analysts", "Debate", "Risk"] },
    image: "/projects/quorum-terminal.jpg",
    href: "https://quorum-terminal.vercel.app",
    repo: "https://github.com/SiddhantSwan12/quorum-trading-terminal",
    note: "The hosted front end runs on a simulated feed; real quotes and agent runs need the FastAPI server.",
  },
  {
    name: "SecureWallet",
    status: "Shipped",
    year: "2026",
    featured: true,
    summary: "Digital-wallet app and security lab with planted, fixed and regression-tested vulnerabilities.",
    description:
      "A local digital-wallet app built to practise application security. Transfers hold money invariants (no negative balances, atomic moves, idempotent retries), and an opt-in lab plants eight vulnerabilities, plus three found in self-review, each reproduced, remediated and regression-tested. Includes an ASVS 4.0.3 self-assessment, a STRIDE threat model and CI running Semgrep, gitleaks, Trivy, CodeQL and a ZAP baseline.",
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "Playwright", "Semgrep", "OWASP ZAP", "GitHub Actions"],
    cover: "orbits",
    coverCopy: { left: "Request", right: "Ledger", center: "Invariant", footer: ["Reproduce", "Remediate", "Verify"] },
    repo: "https://github.com/SiddhantSwan12/AppSec",
  },
  {
    name: "OpenDictate",
    status: "Shipped",
    year: "2026",
    summary: "Offline voice dictation for Windows, built with Tauri and Rust.",
    description:
      "Free, offline voice dictation for Windows: hold a shortcut, speak, release, and the text lands in whatever app has focus. A Tauri/Rust port of the open-source BetterWispr running Parakeet or Whisper on-device, with filler-word cleanup, voice commands, custom vocabulary, correction learning and local meeting notes through Ollama. Ships as a Windows installer.",
    tech: ["Rust", "Tauri", "React", "TypeScript", "Whisper", "Ollama"],
    cover: "waveform",
    coverCopy: { left: "Mic in", right: "Text out", center: "ASR", footer: ["Parakeet", "Whisper", "Cleanup"] },
    href: "https://github.com/SiddhantSwan12/openDictate/releases/latest",
    hrefLabel: "Download",
    repo: "https://github.com/SiddhantSwan12/openDictate",
  },
  {
    name: "Athena.ai",
    status: "Live",
    year: "2025",
    summary: "Multi-domain RAG assistant for finance, health and education.",
    description:
      "Full-stack AI assistant spanning finance, health and education — React/Next.js front end with a Python (Langchain + FastAPI) backend. ~90% accuracy at sub-300ms latency, with reusable voice-to-text routing and a domain-switching UI.",
    tech: ["React", "Next.js", "Python", "Langchain", "FastAPI", "Supabase", "Gemini", "Tavily"],
    cover: "orbits",
    image: "/projects/athena-ai.png",
    href: "https://atheenaai.vercel.app",
    repo: "https://github.com/SiddhantSwan12/Athena_AI",
  },
  {
    name: "FairWork",
    status: "Live",
    year: "2025",
    summary: "Freelance marketplace with smart-contract escrow on Polygon.",
    description:
      "Decentralized freelance marketplace on the Polygon Amoy testnet. React/Next.js front end plus a Python AI arbitration pipeline; smart-contract escrow removes platform trust. REST flows validated for concurrency, upload and timeout edge cases.",
    tech: ["React", "Next.js", "Python", "Solidity", "Polygon", "XMTP", "Supabase", "IPFS"],
    cover: "mesh",
    image: "/projects/fairwork.png",
    href: "https://fair-work-escrow.onrender.com",
    repo: "https://github.com/SiddhantSwan12/AI_Boomi_fair_work",
    note: "Hosted on Render's free tier: the first load can take around 30 seconds while the server wakes.",
  },
  {
    name: "Quant Analytics Dashboard",
    status: "Live",
    year: "2025",
    summary: "Live pairs-trading analytics on Binance Futures tick data.",
    description:
      "Real-time pairs-trading analytics: Binance Futures tick data streamed over WebSockets, persisted to SQLite and resampled into multi-timeframe OHLCV, with OLS hedge ratio, z-score, rolling correlation and ADF stationarity tests, threshold alerts and a Groq-powered market Q&A assistant.",
    tech: ["Python", "Streamlit", "pandas", "SQLite", "Plotly", "Binance", "Statsmodels", "Groq"],
    cover: "mesh",
    coverCopy: { left: "Tick feed", right: "Signals", center: "Z-score", footer: ["OHLCV", "Spread", "ADF"] },
    href: "https://siddhantswan.streamlit.app",
    repo: "https://github.com/SiddhantSwan12/quant_analytics_application",
    note: "Hosted on Streamlit Community Cloud: it sleeps after inactivity and takes a moment to wake.",
  },
  {
    name: "CommunityAI",
    status: "Archived",
    year: "2024",
    summary: "Meeting transcription and content moderation with Whisper and a Discord bot.",
    description:
      "AI platform for meeting transcription and content moderation. A clean-OOP Python/FastAPI backend auto-extracts minutes and action items at ~90% accuracy; a React dashboard and Discord bot cut manual moderation workload by 70%.",
    tech: ["React", "Python", "FastAPI", "OpenAI Whisper", "Streamlit", "Discord API"],
    cover: "waveform",
    coverCopy: { left: "Voice in", right: "Actions out", center: "AI", footer: ["Transcript", "Minutes", "Moderation"] },
    repo: "https://github.com/SanvedN/communityAI",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: "Top", items: ["Python", "Machine Learning", "Large Language Models"] },
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Bash", "Solidity"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "shadcn/ui", "Tailwind CSS", "Framer Motion", "GSAP", "React Three Fiber"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Django", "DRF", "Node.js", "REST APIs", "WebSockets", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "AI / ML",
    items: ["TensorFlow", "PyTorch", "OpenCV", "Langchain", "NLP", "Object Detection", "Computer Vision"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "AWS", "Supabase", "IPFS", "Git", "GitHub", "Linux"],
  },
  {
    label: "Testing",
    items: ["Pytest", "Postman", "Functional Testing", "Edge Cases"],
  },
];

export const education = {
  school: "Vishwakarma Institute of Technology (VIT Pune)",
  degree: "B.Tech, Electronics & Telecommunication Engineering",
  period: "Nov 2022 — May 2026",
  gpa: "8.31 / 10",
  location: "Pune",
  logo: "/logos/vit-pune.png",
};

export const certifications: { title: string; issuer: string; year?: string }[] = [
  { title: "McKinsey Forward Program", issuer: "McKinsey & Company", year: "2026" },
  { title: "Data Visualization", issuer: "LinkedIn Learning", year: "2026" },
  { title: "Python for Data Professionals in Finance", issuer: "LinkedIn Learning", year: "2026" },
  { title: "Cyber Threat Intelligence 101", issuer: "arcX", year: "2025" },
  { title: "IBM DevOps & Software Engineering", issuer: "Coursera", year: "2025" },
  { title: "Deep Learning Certification", issuer: "NVIDIA", year: "2024" },
  { title: "Advanced Quantum Computing — QxQ", issuer: "Qubit by Qubit · Google", year: "2024" },
  { title: "Technoxian World Robotics — Silver Medal", issuer: "Award · Line-following robot", year: "2023" },
];

// Placeholder section (full-clone scope) — awaiting real data.
export const posts: { title: string; date: string; tag: string; href?: string }[] = [];
