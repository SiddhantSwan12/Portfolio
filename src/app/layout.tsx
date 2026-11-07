import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { education, profile, siteUrl, socials } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const TITLE = `${profile.name} — Software Engineer`;
const DESCRIPTION =
  "Software engineer building backend and GenAI systems with Python, FastAPI, LLMs and Next.js. B.Tech ECE, VIT Pune 2026. Open to SWE and AI/ML roles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: profile.name,
    type: "website",
    locale: "en_IN",
  },
};

// viewport-fit=cover lets the phone action bar pad itself past the home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Structured data so search engines connect the site, GitHub and LinkedIn to one person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: "Software Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background transition-colors duration-300">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var p=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t||p;}catch(e){document.documentElement.dataset.theme="dark";}})();`,
          }}
        />
      </body>
    </html>
  );
}
