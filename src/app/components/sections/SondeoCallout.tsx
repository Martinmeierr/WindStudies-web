import { motion } from "motion/react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export function SondeoCallout() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border border-black/10 rounded-[8px] p-8 md:p-16"
        >
          <p className="text-xs tracking-widest uppercase text-black/40 mb-5">¿Tiene sentido trabajar juntos?</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5 md:mb-6">
            Nuestros sistemas no funcionan para todo el mundo.
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-black/70 mb-8 md:mb-10 max-w-2xl">
            Si tu producto no tiene márgenes sanos o tu capacidad de entrega está rota, el contenido va a acelerar el problema, no resolverlo. Este sondeo existe para entender si tiene sentido avanzar.
          </p>
          <Link
            to="/sondeo"
            className="inline-flex items-center gap-2 bg-black text-white px-6 md:px-8 py-3 md:py-4 text-sm font-semibold tracking-wide rounded-[6px] hover:bg-black/80 transition-colors group"
          >
            Completar Sondeo Previo
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-black/30 mt-4">10 preguntas · Menos de 10 minutos · Confidencial</p>
        </motion.div>
      </div>
    </section>
  )
}
