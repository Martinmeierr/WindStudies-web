import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { useRef } from "react";
import { ScrollIndicator } from "../ScrollIndicator";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1638028493561-10ae6ddf1b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWVub3MlMjBBaXJlcyUyMGFyY2hpdGVjdHVyZSUyMG1vZGVybiUyMGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MXx8fHwxNzc2MDc5NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white w-full">
        <motion.img
          src={`${import.meta.env.BASE_URL}logo-white.png`}
          alt="WindStudies"
          className="h-8 md:h-10 w-auto mb-8 md:mb-10 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5 md:mb-6"
        >
          Contenido que convierte.<br />Estrategia que escala.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-xl font-light leading-relaxed max-w-xl mb-8 md:mb-10 opacity-80"
        >
          Ayudamos a marcas a construir presencia real, comunicar con claridad y convertir audiencia en clientes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            to="/sondeo"
            className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 text-sm font-semibold tracking-wide rounded-[6px] hover:bg-white/90 transition-colors"
          >
            Completar Sondeo Previo
          </Link>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
