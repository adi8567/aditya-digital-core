import { useEffect, useRef } from "react";

/** Animated grid + parallax glow that gently follows the mouse. */
export function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      tx = (e.clientX / w - 0.5) * 30;
      ty = (e.clientY / h - 0.5) * 30;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      <div
        className="absolute inset-0 bg-grid"
        style={{ transform: "translate3d(var(--mx,0), var(--my,0), 0)" }}
      />
      <div
        className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--cyan) 35%, transparent), transparent 60%)",
          transform:
            "translate(calc(-50% + var(--mx,0) * 1.4), calc(var(--my,0) * 1.4))",
        }}
      />
      <div
        className="absolute bottom-[-20rem] right-[-10rem] h-[50rem] w-[50rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--violet) 40%, transparent), transparent 60%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
