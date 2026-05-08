import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <img src="/logo-black.png" alt="WindStudies" className="h-6 w-auto object-contain opacity-70" />
        <p className="text-sm text-black/40">© {new Date().getFullYear()} WindStudies. Todos los derechos reservados.</p>
        <div className="flex gap-8">
          <Link to="/sondeo" className="text-sm text-black/50 hover:text-black transition-colors">Sondeo Previo</Link>
          <a href="mailto:windstudiesai@gmail.com" className="text-sm text-black/50 hover:text-black transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
