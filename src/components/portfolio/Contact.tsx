import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:aditya03123@gmail.com" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "peer w-full bg-transparent px-0 py-2.5 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all border-0 border-b border-border focus:border-cyan/0 focus:[box-shadow:0_1px_0_var(--cyan),0_8px_24px_-12px_var(--cyan)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          index="04"
          label="Comm-Link"
          title="Establish Connection"
          desc="Open a secure channel — projects, collaborations, or coffee."
        />

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass space-y-6 rounded-2xl p-7"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Identifier">
                <input required className={inputCls} placeholder="Your name" />
              </Field>
              <Field label="Channel">
                <input required type="email" className={inputCls} placeholder="you@domain.com" />
              </Field>
            </div>
            <Field label="Subject">
              <input className={inputCls} placeholder="What's this about?" />
            </Field>
            <Field label="Payload">
              <textarea
                required
                rows={5}
                className={inputCls + " resize-none"}
                placeholder="Type your message..."
              />
            </Field>

            <button
              type="submit"
              disabled={sent}
              className="btn-sweep group inline-flex items-center gap-2 rounded-md border border-cyan/60 bg-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-cyan transition-colors hover:bg-cyan/20 disabled:opacity-70"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in oklab, var(--cyan) 30%, transparent), 0 10px 40px -10px color-mix(in oklab, var(--cyan) 60%, transparent)",
              }}
            >
              {sent ? (
                <>
                  <Check className="size-4" /> Transmitted
                </>
              ) : (
                <>
                  Transmit Message
                  <Send className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between gap-8"
          >
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
                Direct Line
              </div>
              <a
                href="mailto:aditya03123@gmail.com"
                className="mt-2 block font-display text-xl font-semibold transition-colors hover:text-cyan"
              >
                aditya03123@gmail.com
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Avg. response time: under 24h. Encryption optional.
              </p>
            </div>

            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, label, href }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass float flex size-14 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:text-cyan"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} ADITYA — All systems nominal.</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
            v1.0.0 // built with React + Framer Motion
          </span>
        </footer>
      </div>
    </section>
  );
}
