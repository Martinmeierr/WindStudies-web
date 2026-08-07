import { StatBadge } from "./StatBadge";

const LAYERS = [
  { label: "Autoridad",  size: 100, opacity: 0.10 },
  { label: "Confianza",  size: 74,  opacity: 0.16 },
  { label: "Deseo",      size: 50,  opacity: 0.24 },
  { label: "Conversión", size: 28,  opacity: 1.00 },
];

/**
 * The "anillo estratégico" as concentric rings — the outer layer is the widest
 * audience, the solid core is the sale. Built in markup so the labels stay
 * selectable text and translate with the rest of the page.
 */
export function StrategyRingMock() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="relative aspect-square overflow-hidden rounded-2xl border border-black/[0.08] bg-[#0b0b0b] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {LAYERS.map((l) => (
            <div
              key={l.label}
              className="absolute rounded-full border border-white/15"
              style={{
                width: `${l.size}%`,
                height: `${l.size}%`,
                backgroundColor: `rgba(255,255,255,${l.opacity})`,
              }}
            />
          ))}
          <span className="relative z-10 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
            Cliente
          </span>
        </div>

        {/* Layer legend down the left edge */}
        <div className="absolute left-5 top-5 space-y-2">
          {LAYERS.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full border border-white/25"
                style={{ backgroundColor: `rgba(255,255,255,${Math.max(l.opacity, 0.2)})` }}
              />
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <StatBadge style={{ bottom: "8%", right: "-1rem" }} className="hidden sm:inline-flex">
        4 etapas del funnel
      </StatBadge>
    </div>
  );
}
