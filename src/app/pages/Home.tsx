import { Navbar }         from "../components/layout/Navbar";
import { Footer }         from "../components/layout/Footer";
import { Hero }           from "../components/sections/Hero";
import { About }          from "../components/sections/About";
import { Services }       from "../components/sections/Services";
import { SondeoCallout }  from "../components/sections/SondeoCallout";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <SondeoCallout />
      </main>
      <Footer />
    </div>
  );
}
