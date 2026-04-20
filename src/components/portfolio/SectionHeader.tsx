import { motion } from "framer-motion";

export function SectionHeader({
  index,
  label,
  title,
  desc,
}: {
  index: string;
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-3xl"
    >
      <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-10 bg-cyan/60" />
        <span>{label}</span>
      </div>
      <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {desc}
        </p>
      )}
    </motion.div>
  );
}
