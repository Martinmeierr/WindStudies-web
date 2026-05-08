import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "next-themes";
import App from "./app/App.tsx";
import SondeoPrevio from "./app/pages/SondeoPrevio.tsx";
import { Toaster } from "./app/components/ui/sonner.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sondeo" element={<SondeoPrevio />} />
      </Routes>
      <Toaster position="bottom-right" />
    </HashRouter>
  </ThemeProvider>
);
