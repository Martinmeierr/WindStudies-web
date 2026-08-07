import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  className?: string;
}

/**
 * Infinite horizontal ticker for client logos / social proof.
 *
 * The track holds two identical copies of the children and translates by
 * exactly -50%, so the loop point lands on a duplicate frame and reads as
 * seamless. Animated with a CSS keyframe rather than JS — it runs on the
 * compositor and keeps going while the main thread is busy.
 */
export function Marquee({ children, speed = 32, className = "" }: MarqueeProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-[ws-marquee_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
