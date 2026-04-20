import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Database, LineChart, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Project = {
  icon: typeof Brain;
  title: string;
  tag: string;
  desc: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    icon: Database,
    title: "Retrieval Augmented Pipeline",
    tag: "RAG / LLM",
    desc: "Production RAG pipeline over PDFs with vector search and CUDA-accelerated inference for grounded, citation-backed answers.",
    stack: ["LangChain", "LLaMA-2-7b", "FAISS", "PyTorch / CUDA", "PDF Processing"],
  },
  {
    icon: Brain,
    title: "Brain Tumor Prediction System",
    tag: "Deep Learning",
    desc: "CNN classifier on MRI scans hitting 92% accuracy, served through a Flask API with color-coded diagnostic results.",
    stack: ["TensorFlow / Keras", "CNN", "Flask", "92% Accuracy"],
  },
  {
    icon: LineChart,
    title: "BullsEye",
    tag: "Full-Stack / FinTech",
    desc: "Full-stack stock trading simulation with real-time portfolios, ML-driven price signals and a fast Python forecasting service.",
    stack: ["React", "Node.js", "MongoDB", "FastAPI", "XGBoost"],
  },
];

function CodeRain() {
  // Decorative columns of mono characters; CSS animated.
  const cols = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-30">
      {cols.map((_, i) => (
        <div
          key={i}
          className="absolute top-0 font-mono text-[11px] leading-tight text-cyan"
          style={{
            left: `${(i / cols.length) * 100}%`,
            animation: `float ${4 + (i % 5)}s linear infinite`,
            animationDelay: `${(i % 7) * -0.6}s`,
            writingMode: "vertical-rl",
            textOrientation: "upright",
            whiteSpace: "nowrap",
            transform: "translateY(-10%)",
          }}
        >
          {Array.from({ length: 24 })
            .map(() => (Math.random() > 0.5 ? "1" : "0"))
            .join("")}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); setHover(false); };

  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl"
      >
        {/* animated gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from var(--angle,0deg), transparent 0%, var(--cyan) 25%, transparent 50%, var(--violet) 75%, transparent 100%)",
            animation: hover ? "spin 4s linear infinite" : "none",
            padding: 1,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="glass relative h-full rounded-2xl p-6 sm:p-7">
          <CodeRain />
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan">
                <Icon className="size-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-violet">
                {project.tag}
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {project.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-foreground/75"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-cyan/80">
              View module <ArrowUpRight className="size-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="lab" className="relative px-6 py-28">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label="The Lab"
          title="Selected Builds"
          desc="Experiments shipped from research notebook to production."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
