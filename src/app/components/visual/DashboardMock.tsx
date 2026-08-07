/**
 * Stylised campaign panel used as the hero visual.
 *
 * Deliberately built in markup rather than shipped as a screenshot: it stays
 * sharp at any density, respects the theme, weighs nothing, and does not go
 * stale when the real panel changes. Figures are illustrative.
 */

const METRICS = [
  { label: "Campañas activas", value: "6",     sub: "2 en producción" },
  { label: "Piezas este mes",  value: "48",    sub: "+14 vs. mes ant." },
  { label: "Alcance",          value: "1.4M",  sub: "últimos 30 días" },
  { label: "Leads",            value: "312",   sub: "+312% vs. Q ant." },
];

const PIPELINE = [
  { name: "Reel · Lanzamiento Otoño", stage: "Publicado",  pct: 100, tone: "done" },
  { name: "Carrusel · Autoridad",     stage: "Edición",    pct: 72,  tone: "wip"  },
  { name: "Guion · Caso de éxito",    stage: "Aprobación", pct: 45,  tone: "wip"  },
  { name: "Reel · FAQ producto",      stage: "Guion",      pct: 20,  tone: "todo" },
];

const BARS = [38, 52, 44, 68, 59, 81, 72, 94, 86, 100, 91, 97];

const TONE: Record<string, string> = {
  done: "bg-white",
  wip:  "bg-white/55",
  todo: "bg-white/25",
};

export function DashboardMock() {
  return (
    <div aria-hidden="true" className="select-none bg-[#0b0b0b] p-5 text-white md:p-7">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Resumen</p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight">Panel de campaña</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-wide text-white/40">
          Últimos 30 días
        </span>
      </div>

      {/* Metric tiles */}
      <div className="mb-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3.5">
            <p className="text-[9px] uppercase tracking-[0.14em] text-white/30">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
            <p className="mt-1 text-[10px] text-white/35">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 md:grid-cols-5">
        {/* Bar chart */}
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-4 md:col-span-3">
          <p className="mb-4 text-[9px] uppercase tracking-[0.14em] text-white/30">
            Alcance semanal
          </p>
          <div className="flex h-28 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-white/15 to-white/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-4 md:col-span-2">
          <p className="mb-4 text-[9px] uppercase tracking-[0.14em] text-white/30">Pipeline</p>
          <div className="space-y-3.5">
            {PIPELINE.map((p) => (
              <div key={p.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11px] text-white/70">{p.name}</span>
                  <span className="shrink-0 text-[9px] uppercase tracking-wide text-white/30">
                    {p.stage}
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <div className={`h-full rounded-full ${TONE[p.tone]}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
