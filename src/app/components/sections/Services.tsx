import { Compass, Clapperboard, LineChart } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../visual/Reveal";
import { Eyebrow } from "../visual/Eyebrow";
import { AmbientGlow } from "../visual/AmbientGlow";

const SERVICES = [
  {
    number: "01",
    icon: Compass,
    title: "Estrategia de Contenido",
    description:
      "Definimos el anillo estratégico de tu marca y construimos un sistema de contenido que habla al cliente correcto en el momento correcto.",
    tags: ["Anillo estratégico", "Mensajes", "Calendario"],
  },
  {
    number: "02",
    icon: Clapperboard,
    title: "Gestión y Producción",
    description:
      "Creamos, editamos y publicamos contenido que convierte. Desde reels hasta carruseles, con estructura pensada para cada etapa del funnel.",
    tags: ["Reels", "Carruseles", "Guiones"],
  },
  {
    number: "03",
    icon: LineChart,
    title: "Crecimiento Sistemático",
    description:
      "Medimos, iteramos y escalamos lo que funciona. Nada se hace por intuición — todo tiene un porqué y un resultado esperado.",
    tags: ["Métricas", "Iteración", "Escala"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      <AmbientGlow x="50%" y="0%" size={1000} opacity={0.10} tone="light" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center" amount={0.4}>
          <Eyebrow tone="light">Servicios</Eyebrow>
          <h2 className="mt-6 text-3xl font-bold leading-[1.08] tracking-[-0.03em] md:text-5xl">
            Un sistema, no una lista de tareas.
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-white/50 md:text-lg">
            Las tres piezas trabajan juntas. Contratás una y las otras dos la sostienen.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3" stagger={0.12}>
          {SERVICES.map(({ number, icon: Icon, title, description, tags }) => (
            <RevealItem key={number}>
              <article className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] md:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.16em] text-white/20">
                    {number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  {title}
                </h3>

                <p className="mt-4 text-sm font-light leading-relaxed text-white/55 md:text-base">
                  {description}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] tracking-wide text-white/40"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
