interface AmbientGlowProps {
  /** Position of the glow centre, as CSS percentages. */
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Soft radial bloom used behind hero/section content. Purely decorative —
 * always aria-hidden and never interactive.
 *
 * The blur is baked into the gradient stops rather than applied with
 * `filter: blur()`, which would force the compositor to allocate a texture
 * the size of the glow on every paint.
 */
export function AmbientGlow({
  x = "50%",
  y = "40%",
  size = 900,
  opacity = 0.16,
  tone = "light",
  className = "",
}: AmbientGlowProps) {
  const rgb = tone === "light" ? "255,255,255" : "0,0,0";

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle at center,
          rgba(${rgb},${opacity}) 0%,
          rgba(${rgb},${opacity * 0.55}) 25%,
          rgba(${rgb},${opacity * 0.18}) 45%,
          transparent 68%)`,
      }}
    />
  );
}
