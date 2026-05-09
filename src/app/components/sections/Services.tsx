import { motion } from "motion/react";

const SERVICES = [
  {
    number: "01",
    title: "Estrategia de Contenido",
    description: "Definimos el anillo estratégico de tu marca y construimos un sistema de contenido que habla al cliente correcto en el momento correcto.",
  },
  {
    number: "02",
    title: "Gestión y Producción",
    description: "Creamos, editamos y publicamos contenido que convierte. Desde reels hasta carruseles, con estructura pensada para cada etapa del funnel.",
  },
  {
    number: "03",
    title: "Crecimiento Sistemático",
    description: "Medimos, iteramos y escalamos lo que funciona. Nada se hace por intuición — todo tiene un porqué y un resultado esperado.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest uppercase text-white/40 mb-12 md:mb-20 text-center"
        >
          Servicios
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-widest text-white/30 mb-5">{service.number}</p>
              <h3 className="text-xl md:text-2xl font-semibold leading-snug mb-5">{service.title}</h3>
              <p className="text-base font-light leading-relaxed text-white/60">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
