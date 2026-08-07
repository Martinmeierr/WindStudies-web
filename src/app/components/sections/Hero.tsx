import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { useRef } from "react";
import { ArrowRight, TrendingUp, Eye } from "lucide-react";
import { AmbientGlow } from "../visual/AmbientGlow";
import { Eyebrow } from "../visual/Eyebrow";
import { StatBadge } from "../visual/StatBadge";
import { PerspectiveFrame } from "../visual/PerspectiveFrame";
import { DashboardMock } from "../visual/DashboardMock";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Backdrop drifts slower than the copy, so the layers separate as you leave
  // the fold. Bound to the hero itself rather than the page, so it finishes
  // exactly when the hero is gone.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const copyY     = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section ref={ref} className="relative overflow-hidden bg-black pt-32 pb-0 md:pt-40">
      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { y: bgY, opacity: bgOpacity }}
      >
        {/* Faint grid. Fades out toward the bottom so it never competes with
            the mockup sitting on top of it. */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 60% at 50% 30%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 30%, black 20%, transparent 75%)",
          }}
        />
        <AmbientGlow x="50%" y="26%" size={1100} opacity={0.18} tone="light" />
        <AmbientGlow x="18%" y="70%" size={700} opacity={0.07} tone="light" />
      </motion.div>

      {/* ── Copy ─────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white"
        style={reduced ? undefined : { y: copyY }}
      >
        <motion.div {...rise(0.05)}>
          <Eyebrow tone="light" dot>
            Agencia de contenido · Buenos Aires
          </Eyebrow>
        </motion.div>

        <motion.h1
          {...rise(0.18)}
          className="mx-auto mt-8 max-w-4xl text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          Contenido que convierte.
          <br />
          Estrategia que <span className="italic font-semibold">escala</span>.
        </motion.h1>

        <motion.p
          {...rise(0.3)}
          className="mx-auto mt-7 max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg"
        >
          Ayudamos a marcas a construir presencia real, comunicar con claridad y
          convertir audiencia en clientes.
        </motion.p>

        <motion.div
          {...rise(0.42)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/sondeo"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-white/90 sm:w-auto"
          >
            Completar Sondeo Previo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#servicios"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
          >
            Ver cómo trabajamos
          </a>
        </motion.div>

        <motion.p {...rise(0.55)} className="mt-8 text-xs tracking-[0.12em] text-white/35">
          10 PREGUNTAS · MENOS DE 10 MINUTOS · CONFIDENCIAL
        </motion.p>
      </motion.div>

      {/* ── Product visual ───────────────────────────────────────── */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl px-6 md:mt-24">
        <PerspectiveFrame tilt={22} label="windstudies · panel de campaña">
          <DashboardMock />
        </PerspectiveFrame>

        <StatBadge
          style={{ top: "12%", right: "-1rem" }}
          icon={<TrendingUp className="h-4 w-4" />}
          floatDelay={0.1}
          className="hidden sm:inline-flex"
        >
          +312% alcance
        </StatBadge>
        <StatBadge
          style={{ bottom: "16%", left: "-1.5rem" }}
          icon={<Eye className="h-4 w-4" />}
          floatDelay={0.25}
          className="hidden sm:inline-flex"
        >
          1.4M vistas
        </StatBadge>
      </div>

      {/* Bleed the frame into the section below instead of cutting it off. */}
      <div className="h-24 md:h-32" />
    </section>
  );
}
