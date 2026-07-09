"use client";

import { useReducedMotion, motion } from "framer-motion";

type DotMapProps = {
  tone?: "flame" | "signal";
  className?: string;
};

/**
 * Ambient dot-grid signature backdrop.
 * A quiet field of dots with a single soft glow blob drifting behind it,
 * echoing Flamestar's map-of-opportunity motif without literally tracing borders.
 */
export function DotMap({ tone = "flame", className = "" }: DotMapProps) {
  const prefersReducedMotion = useReducedMotion();
  const glow = tone === "flame" ? "var(--color-flame)" : "var(--color-signal)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <motion.div
        className="absolute -right-[10%] top-1/2 h-[65%] w-[55%] -translate-y-1/2 rounded-full blur-[90px]"
        style={{ backgroundColor: glow, opacity: 0.22 }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.16, 0.26, 0.16], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
    </div>
  );
}
