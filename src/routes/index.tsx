import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { DataCore } from "@/components/portfolio/DataCore";
import { TechArsenal } from "@/components/portfolio/TechArsenal";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aditya — Full-Stack & AI Developer" },
      {
        name: "description",
        content:
          "Portfolio of Aditya — Full-Stack & AI Developer. RAG pipelines, deep learning, and full-stack systems built with React, Node, LangChain and PyTorch.",
      },
      { property: "og:title", content: "Aditya — Full-Stack & AI Developer" },
      {
        property: "og:description",
        content:
          "Cyberpunk-grade portfolio: projects in RAG, computer vision, and full-stack fintech.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen text-foreground">
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        <DataCore />
        <TechArsenal />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
