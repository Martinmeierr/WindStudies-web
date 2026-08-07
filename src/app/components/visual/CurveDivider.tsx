interface CurveDividerProps {
  /** Colour of the section above the curve. */
  from: "white" | "black";
  /** Colour of the section below — this is what the arc is filled with. */
  to: "white" | "black";
  /** Height of the transition band in px. Bigger = lazier, wider arc. */
  height?: number;
  /** Soft light bloom along the crest. Off for white-on-black (it muddies). */
  glow?: boolean;
}

const BG = { white: "#ffffff", black: "#000000" } as const;

/**
 * Organic light <-> dark section transition: a very wide, very flat ellipse
 * rising out of the bottom edge, with an optional bloom along the crest.
 *
 * Built with border-radius rather than an SVG path — the browser rasterises
 * the curve at device resolution, so it stays clean on retina and needs no
 * viewBox maths when the viewport changes.
 */
export function CurveDivider({ from, to, height = 160, glow = false }: CurveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height, backgroundColor: BG[from] }}
    >
      {glow && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: height * 0.42,
            width: "70%",
            height: height * 0.9,
            // The bloom belongs to the arc, so it takes the arc's own colour:
            // a white crest bleeding up into the dark band above it. Keying it
            // off `from` instead paints black on black and shows nothing.
            background: `radial-gradient(ellipse at center, ${
              to === "white" ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.16)"
            } 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      )}

      {/* The arc. Wider than the viewport so the left/right ends of the
          ellipse are clipped and only the flat crest is visible. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{
          width: "160%",
          height: height * 1.6,
          backgroundColor: BG[to],
          borderRadius: "50% 50% 0 0",
        }}
      />
    </div>
  );
}
