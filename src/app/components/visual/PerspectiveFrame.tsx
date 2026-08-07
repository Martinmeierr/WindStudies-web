import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface PerspectiveFrameProps {
  children: ReactNode;
  /** Starting tilt in degrees. The frame rotates to 0 as it enters view. */
  tilt?: number;
  /** Show the macOS-style window chrome bar. */
  chrome?: boolean;
  label?: string;
  className?: string;
}

/**
 * A mockup frame that starts tilted back in 3D and straightens as you scroll
 * it into view.
 *
 * go-marz ships this look as flat pre-rendered PNGs, so their tilt is frozen.
 * Doing it in CSS means the perspective is live — and it costs one transform
 * on the compositor rather than a 400KB image.
 *
 * scrollYProgress is passed through a spring so the tilt keeps easing after a
 * flick of the trackpad instead of snapping to wherever the scroll stopped.
 */
export function PerspectiveFrame({
  children,
  tilt = 20,
  chrome = true,
  label,
  className = "",
}: PerspectiveFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  const rotateX = useTransform(smooth, [0, 1], [tilt, 0]);
  const scale   = useTransform(smooth, [0, 1], [0.9, 1]);
  const opacity = useTransform(smooth, [0, 0.35], [0, 1]);

  const style = reduced ? undefined : { rotateX, scale, opacity };

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: 1400 }}>
      <motion.div
        // Rotating about the bottom edge tips the top away from the viewer —
        // the laptop-lid read. The perspective lives on the parent.
        style={{ ...style, transformOrigin: "50% 100%" }}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)] will-change-transform"
      >
        {chrome && (
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            {label && (
              <span className="ml-3 text-[11px] tracking-wide text-white/30">{label}</span>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}
