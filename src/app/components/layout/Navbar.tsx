import { motion } from "motion/react";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}logo-white.png`} alt="WindStudies" className="h-6 md:h-7 w-auto object-contain" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-6 md:gap-8"
        >
          <a href="#servicios" className="hidden md:block text-sm text-white/70 hover:text-white transition-colors">Servicios</a>
          <a href="#nosotros" className="hidden md:block text-sm text-white/70 hover:text-white transition-colors">Nosotros</a>
          <Link
            to="/sondeo"
            className="text-sm bg-white text-black px-4 py-2 rounded-[6px] hover:bg-white/90 transition-colors whitespace-nowrap font-medium"
          >
            Empezar
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
