import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface StatBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  /** Absolute placement inside the parent (which must be `relative`). */
  style: React.CSSProperties;
  /** Seconds of offset so multiple badges don't bob in lockstep. */
  floatDelay?: number;
  className?: string;
}

/**
 * The white pill that floats over a product visual — "6.1% conversión",
 * "180K vistas". Carries the number that the surrounding copy is claiming,
 * which is what makes a static mockup read as live.
 */
export function StatBadge({ children, icon, style, floatDelay = 0, className = "" }: StatBadgeProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute z-20 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.28)] ${className}`}
      style={style}
      initial={reduced ? undefined : { opacity: 0, scale: 0.86 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.25 + floatDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon}
      {children}
    </motion.div>
  );
}
