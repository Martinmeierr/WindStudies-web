import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  tone?: "light" | "dark";
  /** Renders a small pulsing dot before the label. */
  dot?: boolean;
  className?: string;
}

/**
 * Small pill label that sits above a headline ("SERVICIOS", "CÓMO TRABAJAMOS").
 * Replaces the bare uppercase <p> the sections were using — the border and
 * background give the eye something to anchor on before the big type lands.
 */
export function Eyebrow({ children, tone = "dark", dot = false, className = "" }: EyebrowProps) {
  const styles =
    tone === "light"
      ? "border-white/15 bg-white/[0.06] text-white/70"
      : "border-black/10 bg-black/[0.04] text-black/60";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${styles} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${
              tone === "light" ? "bg-white" : "bg-black"
            }`}
          />
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
              tone === "light" ? "bg-white" : "bg-black"
            }`}
          />
        </span>
      )}
      {children}
    </span>
  );
}
