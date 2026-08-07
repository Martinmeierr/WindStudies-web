import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { scrollToId } from "../../lib/scrollToId";

const LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "nosotros",  label: "Nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  // Springing the progress value keeps the bar gliding after a fast flick
  // instead of jumping frame-to-frame with the raw scroll position.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Subscribed rather than stored in state per frame — this only re-renders
  // on the two frames where the threshold is actually crossed.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        <Link to="/" aria-label="WindStudies — inicio">
          <img
            src={`${import.meta.env.BASE_URL}logo-white.png`}
            alt="WindStudies"
            className="h-6 w-auto object-contain md:h-7"
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id)}
              className="hidden text-sm text-white/60 transition-colors hover:text-white md:block"
            >
              {label}
            </button>
          ))}

          <Link
            to="/sondeo"
            className="whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Empezar
          </Link>
        </div>
      </div>

      {/* Reading-progress hairline. */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-white/70"
        style={{ scaleX: progress }}
      />
    </nav>
  );
}
