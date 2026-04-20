import { motion } from "framer-motion";

const LINKS = [
  { href: "#data-core", label: "01 Core" },
  { href: "#arsenal", label: "02 Arsenal" },
  { href: "#lab", label: "03 Lab" },
  { href: "#contact", label: "04 Comm" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex items-center gap-2 rounded-full px-3 py-2 sm:gap-1">
        <a href="#hero" className="px-3 py-1.5 font-display text-sm font-bold tracking-widest text-cyan">
          A//
        </a>
        <div className="hidden items-center sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:bg-white/5 hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-1 rounded-full border border-cyan/50 bg-cyan/10 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-cyan transition-colors hover:bg-cyan/20"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
