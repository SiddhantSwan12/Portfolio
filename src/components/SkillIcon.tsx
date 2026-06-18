import {
  siPython,
  siJavascript,
  siTypescript,
  siCplusplus,
  siGnubash,
  siSolidity,
  siReact,
  siNextdotjs,
  siShadcnui,
  siTailwindcss,
  siFramer,
  siGsap,
  siThreedotjs,
  siFastapi,
  siDjango,
  siNodedotjs,
  siPostgresql,
  siMongodb,
  siRedis,
  siTensorflow,
  siPytorch,
  siOpencv,
  siLangchain,
  siDocker,
  siSupabase,
  siIpfs,
  siGit,
  siGithub,
  siLinux,
  siPytest,
  siPostman,
  siStreamlit,
  siDiscord,
  siGooglegemini,
  siPolygon,
  type SimpleIcon,
} from "simple-icons";

// Maps a skill name from content.ts to a monochrome Simple Icon.
// Names without a recognizable brand mark are intentionally omitted and
// fall back to text only.
const ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  "C++": siCplusplus,
  Bash: siGnubash,
  Solidity: siSolidity,
  React: siReact,
  "Next.js": siNextdotjs,
  "shadcn/ui": siShadcnui,
  "Tailwind CSS": siTailwindcss,
  "Framer Motion": siFramer,
  GSAP: siGsap,
  "React Three Fiber": siThreedotjs,
  FastAPI: siFastapi,
  Django: siDjango,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Redis: siRedis,
  TensorFlow: siTensorflow,
  PyTorch: siPytorch,
  OpenCV: siOpencv,
  Langchain: siLangchain,
  Docker: siDocker,
  Supabase: siSupabase,
  IPFS: siIpfs,
  Git: siGit,
  GitHub: siGithub,
  Linux: siLinux,
  Pytest: siPytest,
  Postman: siPostman,
  Streamlit: siStreamlit,
  "Discord API": siDiscord,
  Gemini: siGooglegemini,
  Polygon: siPolygon,
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function hasSkillIcon(name: string) {
  return name in ICONS;
}
