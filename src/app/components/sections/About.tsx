import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../visual/Eyebrow";
import { Reveal } from "../visual/Reveal";

// Split into clauses rather than words: a word-by-word reveal on a paragraph
// this long reads as a slot machine. Clause-by-clause reads as someone
// thinking.
const CLAUSES = [
  "WindStudies es una agencia de estrategia de contenido y comunicación digital.",
  "Trabajamos con marcas que ya tienen algo funcionando",
  "y quieren llevarlo al siguiente nivel:",
  "más claridad, más sistema, más conversión.",
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="nosotros" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal amount={0.5}>
          <Eyebrow>Quiénes somos</Eyebrow>
        </Reveal>

        <motion.p
          className="mt-8 text-2xl font-light leading-[1.35] tracking-[-0.02em] text-black/85 md:text-[2.1rem]"
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        >
          {CLAUSES.map((clause, i) => (
            // Stays `inline` so long clauses still wrap naturally, which rules
            // out translate — inline boxes ignore transforms. Blur-to-sharp
            // gives the same "settling into place" read without one.
            <motion.span
              key={i}
              className="inline"
              variants={{
                hidden:  { opacity: 0, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {clause}{" "}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
