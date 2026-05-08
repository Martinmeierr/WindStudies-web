import { motion } from "motion/react";

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-widest uppercase text-black/40 mb-6">Quiénes somos</p>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">
            WindStudies es una agencia de estrategia de contenido y comunicación digital. Trabajamos con marcas que ya tienen algo funcionando y quieren llevarlo al siguiente nivel: más claridad, más sistema, más conversión.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
