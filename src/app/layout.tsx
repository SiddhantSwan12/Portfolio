import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Siddhant Swan — Software Engineer",
  description:
    "Software Engineer · Backend & GenAI. Python · FastAPI · LLMs · Solidity. Building real-world AI systems. Final-year @ VIT Pune.",
  metadataBase: new URL("https://siddhantswan.dev"),
  openGraph: {
    title: "Siddhant Swan — Software Engineer",
    description:
      "Backend & GenAI engineer building real-world AI systems with Python, FastAPI, LLMs and Solidity.",
    type: "website",
  },
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
