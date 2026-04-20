import { motion } from "framer-motion";
import { GraduationCap, Award, Cpu } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

function RadialStat({ value, max, label, sub }: { value: number; max: number; label: string; sub: string }) {
  const pct = Math.min(1, value / max);
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="glass relative flex flex-col items-center gap-3 rounded-2xl p-6">
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r={r} stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" fill="none" />
          <motion.circle
            cx="70"
            cy="70"
            r={r}
            stroke="var(--cyan)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px var(--cyan))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-3xl font-bold text-cyan">
            {value.toFixed(2)}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            / {max}
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-cyan">{label}</div>
        <div className="mt-1 text-sm text-foreground/90">{sub}</div>
      </div>
    </div>
  );
}

function TelemetryCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Award;
  title: string;
  items: string[];
}) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-violet/40 bg-violet/10 text-violet">
          <Icon className="size-5" />
        </div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 font-mono text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-foreground/85">
            <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DataCore() {
  return (
    <section id="data-core" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          label="Data Core"
          title="Telemetry & Credentials"
          desc="Real-time readout of academic standing, certifications and core CS foundations."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <RadialStat value={8.94} max={10} label="SRMIST" sub="B.Tech CSE — CGPA" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TelemetryCard
              icon={Award}
              title="Certifications"
              items={[
                "Oracle 2025 — Generative AI Professional",
                "AWS Certified Cloud Practitioner",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TelemetryCard
              icon={Cpu}
              title="Core Concepts"
              items={["DBMS", "Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems"]}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <GraduationCap className="size-3.5 text-cyan" />
          <span>STATUS: <span className="text-cyan">ONLINE</span> • LAST SYNC: just now</span>
        </motion.div>
      </div>
    </section>
  );
}
