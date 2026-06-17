import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { OpenSource } from "@/components/OpenSource";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Writing } from "@/components/Writing";
import { Footer } from "@/components/Footer";
import { InteractiveLayer } from "@/components/InteractiveLayer";

export default function Home() {
  return (
    <>
      <InteractiveLayer />
      <Nav />
      <main className="flex flex-col gap-24 pb-8 md:gap-32">
        <Hero />
        <Experience />
        <Projects />
        <OpenSource />
        <Skills />
        <Education />
        <Writing />
      </main>
      <Footer />
    </>
  );
}
