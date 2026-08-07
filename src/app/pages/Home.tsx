import { Navbar }        from "../components/layout/Navbar";
import { Footer }        from "../components/layout/Footer";
import { Hero }          from "../components/sections/Hero";
import { SocialProof }   from "../components/sections/SocialProof";
import { About }         from "../components/sections/About";
import { FeatureSplit }  from "../components/sections/FeatureSplit";
import { Services }      from "../components/sections/Services";
import { SondeoCallout } from "../components/sections/SondeoCallout";
import { CurveDivider }  from "../components/visual/CurveDivider";
import { StrategyRingMock } from "../components/visual/StrategyRingMock";
import { GrowthMock }       from "../components/visual/GrowthMock";

/**
 * Page rhythm: dark opening → light middle → dark services → light close.
 * Every light/dark switch goes through a CurveDivider so the eye is carried
 * across the boundary instead of hitting a hard horizontal edge.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main>
        <Hero />
        <SocialProof />

        <CurveDivider from="black" to="white" height={150} glow />

        <About />

        <FeatureSplit
          eyebrow="Estrategia"
          title={<>No hace falta que seas experto en contenido.</>}
          body="Nosotros armamos el sistema: qué se dice, a quién, en qué momento del funnel y con qué objetivo. Vos aprobás las decisiones que importan."
          points={[
            "Anillo estratégico definido antes de grabar nada",
            "Mensajes por etapa, no publicaciones sueltas",
            "Calendario con un porqué detrás de cada pieza",
          ]}
          visual={<StrategyRingMock />}
          visualSide="right"
        />

        <FeatureSplit
          eyebrow="Resultados"
          title={<>Medimos lo que pasa. Después escalamos lo que funciona.</>}
          body="Nada se hace por intuición. Cada pieza tiene una hipótesis, una métrica y un resultado esperado — y lo que no rinde se corta rápido."
          points={[
            "Reportes mensuales con números, no con sensaciones",
            "Iteración sobre los formatos que ya están rindiendo",
            "Presupuesto que se mueve hacia lo que convierte",
          ]}
          visual={<GrowthMock />}
          visualSide="left"
        />

        <CurveDivider from="white" to="black" height={150} />

        <Services />

        <CurveDivider from="black" to="white" height={150} glow />

        <SondeoCallout />
      </main>

      <Footer />
    </div>
  );
}
