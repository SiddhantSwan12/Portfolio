// Single source of truth for portfolio content. See CONTENT.md.

export const profile = {
  name: "Siddhant Swan",
  handle: "SiddhantSwan",
  headline: "Software Engineer · Backend & GenAI",
  subheadline:
    "Python · FastAPI · LLMs · Solidity — building real-world AI systems. Final-year @ VIT Pune.",
  tagline:
    "I need to understand how things actually work — that curiosity pulled me from electronics → software → AI → blockchain.",
  intro: [
    "I work at the intersection of backend systems and AI, where clean architecture and sharp logic both matter.",
    "Production backend at Enovate IT, threat-intel as a SOC analyst, and cross-border BD with Grant Thornton China.",
    "Currently studying for CFA Level 1 (Nov 2026) and doing competitive programming. Open to full-time SWE / AI roles from mid-2026.",
  ],
  email: "swansiddhant9@gmail.com",
  resumeUrl: "/resume.pdf",
  avatar: "/profilePhoto.png",
};

export type SocialLink = { label: string; href: string };
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/SiddhantSwan12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhantswan/" },
  { label: "Twitter", href: "https://twitter.com/SiddhantSwan" },
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
    role: "Software Engineer",
    period: "Jan 2026 — Mar 2026",
    location: "Pune",
    active: true,
    logo: { initials: "E", wordmark: "Enovate", src: "/logos/enovate.png" },
    bullets: [
      "Built backend API features with Python and FastAPI across a production codebase under senior-engineer guidance.",
      "Debugged and refactored API endpoints, getting hands-on with how production backends are structured and maintained.",
      "Delivered tasks across agile sprints with daily standups over the 3-month contract.",
    ],
    tags: ["Python", "FastAPI", "REST"],
  },
  {
    org: "Geeks Solutions",
    role: "SOC Intern",
    period: "Jul 2025 — Dec 2025",
    logo: { initials: "GS", wordmark: "Geeks", src: "/logos/geeks-solutions.png" },
    bullets: [
      "Monitored and triaged SIEM-flagged security alerts daily as part of the SOC team.",
      "Wrote Python scripts to automate parts of log review, speeding up routine checks.",
      "Earned the Cyber Threat Intelligence 101 cert (arcX) and applied it directly in analyst work.",
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

export type ProjectStatus = "Live" | "Building" | "Not Started";
export type ProjectCover = "orbits" | "mesh" | "waveform";
export type Project = {
  name: string;
  status: ProjectStatus;
  year: string;
  description: string;
  tech: string[];
  cover: ProjectCover;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Athena.ai",
    status: "Live",
    year: "2025",
    description:
      "Full-stack AI assistant spanning finance, health and education — React/Next.js front end with a Python (Langchain + FastAPI) backend. ~90% accuracy at sub-300ms latency, with reusable voice-to-text routing and a domain-switching UI.",
    tech: ["React", "Next.js", "Python", "Langchain", "FastAPI", "Supabase", "Gemini", "Tavily"],
    cover: "orbits",
  },
  {
    name: "FairWork",
    status: "Live",
    year: "2025",
    description:
      "Decentralized freelance marketplace on the Polygon Amoy testnet. React/Next.js front end plus a Python AI arbitration pipeline; smart-contract escrow removes platform trust. REST flows validated for concurrency, upload and timeout edge cases.",
    tech: ["React", "Next.js", "Python", "Solidity", "Polygon", "XMTP", "Supabase", "IPFS"],
    cover: "mesh",
    href: "https://fair-work-escrow.onrender.com",
  },
  {
    name: "CommunityAI",
    status: "Live",
    year: "2024",
    description:
      "AI platform for meeting transcription and content moderation. A clean-OOP Python/FastAPI backend auto-extracts minutes and action items at ~90% accuracy; a React dashboard and Discord bot cut manual moderation workload by 70%.",
    tech: ["React", "Python", "FastAPI", "OpenAI Whisper", "Streamlit", "Discord API"],
    cover: "waveform",
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
  { title: "Cyber Threat Intelligence 101", issuer: "arcX", year: "2025" },
  { title: "IBM DevOps & Software Engineering", issuer: "Coursera", year: "2025" },
  { title: "Advanced Quantum Computing — QxQ", issuer: "Qubit by Qubit · Google", year: "2024" },
  { title: "Deep Learning Certification", issuer: "NVIDIA", year: "2024" },
  { title: "Data Visualization & Storytelling", issuer: "Certification" },
  { title: "Python for Data Professionals in Finance", issuer: "Certification" },
  { title: "Technoxian World Robotics — Silver Medal", issuer: "Line-Following Robot", year: "2023" },
];

// Placeholder section (full-clone scope) — awaiting real data.
export const posts: { title: string; date: string; tag: string; href?: string }[] = [];
