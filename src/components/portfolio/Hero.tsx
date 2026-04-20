import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const BOOT_LINES = [
  "> Initializing Aditya.exe...",
  "> Authentication successful.",
];

function useTypewriter(lines: string[], speed = 28) {
  const [out, setOut] = useState<string[]>([""]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let line = 0;
    let char = 0;
    const buf: string[] = [""];
    const id = setInterval(() => {
      if (line >= lines.length) {
        clearInterval(id);
        setDone(true);
        return;
      }
      const cur = lines[line];
      buf[line] = cur.slice(0, ++char);
      setOut([...buf]);
      if (char >= cur.length) {
        line++;
        char = 0;
        buf.push("");
      }
    }, speed);
    return () => clearInterval(id);
  }, [lines, speed]);

  return { out, done };
}

export function Hero() {
  const { out, done } = useTypewriter(BOOT_LINES);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto mb-10 max-w-xl rounded-xl p-4 text-left font-mono text-[13px] leading-relaxed sm:text-sm"
        >
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <Terminal className="ml-2 size-3.5" />
            <span className="text-xs">aditya@core ~ %</span>
          </div>
          {out.map((l, i) => (
            <div key={i} className="text-foreground/90">
              <span className="text-cyan">{l}</span>
              {i === out.length - 1 && !done && (
                <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-[18vw] font-black leading-[0.9] tracking-tight sm:text-[14vw] md:text-[180px]"
        >
          <span
            data-text="ADITYA"
            className="glitch bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
          >
            ADITYA
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 font-mono text-sm uppercase tracking-[0.4em] text-muted-foreground sm:text-base"
        >
          Full-Stack <span className="text-cyan">/</span> AI Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href="#contact"
            className="btn-sweep group inline-flex items-center gap-2 rounded-md border border-cyan/60 bg-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-cyan transition-colors hover:bg-cyan/20"
            style={{
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--cyan) 30%, transparent), 0 10px 40px -10px color-mix(in oklab, var(--cyan) 60%, transparent)",
            }}
          >
            Initiate Contact
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
