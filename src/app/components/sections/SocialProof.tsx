import { Marquee } from "../visual/Marquee";
import { Reveal } from "../visual/Reveal";

/**
 * PLACEHOLDER: swap these wordmarks for real client logos.
 *
 * Drop the files in `public/clients/` and replace the <span> with
 * <img src={`${import.meta.env.BASE_URL}clients/acme.svg`} alt="Acme" />.
 * Keep them monochrome white — the marquee sits on black and mixed-colour
 * logos will fight each other.
 */
const CLIENTS = [
  "ATLAS", "NORDVIA", "CASA MERIDIA", "KOVE", "ALTAMAR",
  "ESTUDIO ONCE", "VÉRTICE", "LUMEN",
];

export function SocialProof() {
  return (
    <section className="bg-black pb-24 pt-4 md:pb-32">
      <Reveal className="mx-auto mb-10 max-w-6xl px-6 text-center" amount={0.5}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Marcas que crecen con WindStudies
        </p>
      </Reveal>

      <Marquee speed={38}>
        {CLIENTS.map((name) => (
          <span
            key={name}
            className="px-10 text-xl font-semibold tracking-[0.08em] text-white/25 transition-colors duration-300 hover:text-white/60 md:px-14 md:text-2xl"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
