import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const SKILLS = [
  "C", "C++", "Python", "LangChain", "TensorFlow",
  "React", "Node.js", "Express.js", "MongoDB",
  "Docker", "Pandas", "Scikit-learn",
];

function MagneticBadge({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const rx = useTransform(sy, [-30, 30], [10, -10]);
  const ry = useTransform(sx, [-30, 30], [-10, 10]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    // Repel slightly: push away from cursor
    x.set(-dx * 0.25);
    y.set(-dy * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, rotateX: rx, rotateY: ry, transformPerspective: 600 }}
      className="select-none"
    >
      <div className="glass cursor-default rounded-full px-5 py-2.5 font-mono text-sm text-foreground/90 transition-colors hover:text-cyan">
        {label}
      </div>
    </motion.div>
  );
}

export function TechArsenal() {
  return (
    <section id="arsenal" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label="Tech Arsenal"
          title="Experience & Skills"
          desc="Battle-tested toolkit and leadership footprint."
        />

        {/* Timeline node */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 pl-10 sm:pl-14"
        >
          <div className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-cyan via-cyan/30 to-transparent sm:left-5" />
          <div className="absolute left-1.5 top-2 size-3 rounded-full bg-cyan pulse-ring sm:left-3.5" />

          <div className="glass rounded-2xl p-6 sm:p-7">
            <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <Briefcase className="size-3.5 text-cyan" />
              <span className="text-cyan">Leadership Node</span>
              <span className="text-muted-foreground">// active</span>
            </div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">
              Technical Committee Head
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Directorate of Student Affairs — SRMIST
            </p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              Led a technical squad to redesign and harden the{" "}
              <span className="text-cyan">Milan Techfest</span> website, scaling
              UX, performance and reliability for{" "}
              <span className="text-violet">5,000+ participants</span> across
              registrations, event management and live ops.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Users className="size-3.5" />
              5,000+ participants served
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          // arsenal.dat
        </h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <MagneticBadge label={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
