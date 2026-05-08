import { motion } from "motion/react";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}logo-black.png`} alt="WindStudies" className="h-6 md:h-7 w-auto object-contain" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-6 md:gap-8"
        >
          <a href="#servicios" className="hidden md:block text-sm hover:opacity-60 transition-opacity">Servicios</a>
          <a href="#nosotros" className="hidden md:block text-sm hover:opacity-60 transition-opacity">Nosotros</a>
          <Link
            to="/sondeo"
            className="text-sm bg-black text-white px-4 py-2 hover:bg-black/80 transition-colors whitespace-nowrap"
          >
            Empezar
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
