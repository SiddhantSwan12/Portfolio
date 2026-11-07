import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/lib/content";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Python", "FastAPI", "LLMs", "Next.js", "Solidity"];

// Geist Bold for the name, fetched from Google Fonts at build time (the image is
// statically generated). Falls back to the bundled default font if the fetch fails.
async function loadGeistBold(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Geist:wght@700", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; next-og)" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const geistBold = await loadGeistBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 50% -20%, #1b1b20 0%, #000000 60%)",
          color: "#e4e1e6",
          fontFamily: geistBold ? "Geist, sans-serif" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8e9192",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
            <span>{profile.availability}</span>
          </div>
          <span style={{ textTransform: "none", letterSpacing: 0 }}>{siteUrl.replace("https://", "")}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 100, fontWeight: 700, letterSpacing: -4, lineHeight: 1, color: "#ffffff" }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 36, color: "#c4c7c8", letterSpacing: 1 }}>{profile.headline}</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {TAGS.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 18px",
                border: "1px solid #2a2a2d",
                borderRadius: 8,
                background: "#0d0d10",
                fontSize: 24,
                color: "#e4e1e6",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: geistBold ? [{ name: "Geist", data: geistBold, weight: 700, style: "normal" }] : undefined,
    },
  );
}
