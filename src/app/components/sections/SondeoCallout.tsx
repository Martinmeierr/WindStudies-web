import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../visual/Reveal";
import { Eyebrow } from "../visual/Eyebrow";
import { AmbientGlow } from "../visual/AmbientGlow";

export function SondeoCallout() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-5xl" amount={0.25}>
        <div className="relative overflow-hidden rounded-[28px] bg-black px-8 py-14 text-white md:px-16 md:py-20">
          <AmbientGlow x="80%" y="10%" size={800} opacity={0.14} tone="light" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 80% 80% at 70% 20%, black, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 70% 20%, black, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <Eyebrow tone="light">¿Tiene sentido trabajar juntos?</Eyebrow>

            <h2 className="mt-7 text-3xl font-bold leading-[1.08] tracking-[-0.03em] md:text-5xl">
              Nuestros sistemas no funcionan para todo el mundo.
            </h2>

            <p className="mt-7 text-base font-light leading-relaxed text-white/60 md:text-lg">
              Si tu producto no tiene márgenes sanos o tu capacidad de entrega está
              rota, el contenido va a acelerar el problema, no resolverlo. Este
              sondeo existe para entender si tiene sentido avanzar.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/sondeo"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-white/90"
              >
                Completar Sondeo Previo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-xs tracking-[0.1em] text-white/35">
                10 PREGUNTAS · &lt;10 MIN · CONFIDENCIAL
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
