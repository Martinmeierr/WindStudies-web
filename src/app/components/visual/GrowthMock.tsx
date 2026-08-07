import { motion, useReducedMotion } from "motion/react";
import { StatBadge } from "./StatBadge";

// viewBox is 0 0 320 130. Points are hand-placed so the curve reads as
// "steady climb with a real dip", not a synthetic straight line.
const LINE =
  "M0,110 C24,104 40,96 64,92 C88,88 100,98 124,86 C148,74 160,56 184,52 C208,48 220,60 244,44 C268,28 284,18 320,10";
const AREA = `${LINE} L320,130 L0,130 Z`;

const ROWS = [
  { label: "Impresiones",  value: "1.4M", delta: "+312%" },
  { label: "Guardados",    value: "38.2K", delta: "+184%" },
  { label: "Consultas",    value: "312",  delta: "+96%"  },
];

/** Growth panel for the second feature row. Figures are illustrative. */
export function GrowthMock() {
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-black/[0.08] bg-[#0b0b0b] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="mb-5 flex items-baseline justify-between">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
            Crecimiento acumulado
          </p>
          <span className="text-[10px] tracking-wide text-white/30">6 meses</span>
        </div>

        <svg viewBox="0 0 320 130" className="h-36 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ws-growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#fff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[26, 52, 78, 104].map((y) => (
            <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#fff" strokeOpacity="0.06" strokeWidth="1" />
          ))}

          <motion.path
            d={AREA}
            fill="url(#ws-growth-fill)"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Draws itself by animating the dash offset from full length to 0. */}
          <motion.path
            d={LINE}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduced ? undefined : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <div className="mt-6 space-y-3 border-t border-white/[0.07] pt-5">
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between">
              <span className="text-xs text-white/45">{r.label}</span>
              <span className="flex items-baseline gap-3">
                <span className="text-sm font-semibold text-white">{r.value}</span>
                <span className="w-14 text-right text-[11px] text-white/50">{r.delta}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <StatBadge style={{ top: "-1rem", left: "-1rem" }} className="hidden sm:inline-flex">
        Medido, no intuido
      </StatBadge>
    </div>
  );
}
