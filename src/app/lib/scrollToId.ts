/**
 * Scrolls to a section by id without touching the URL hash.
 *
 * The app runs on HashRouter, so `<a href="#servicios">` is not a same-page
 * anchor here — it rewrites location.hash, which the router reads as a route
 * change to /servicios and renders nothing. Scrolling imperatively keeps the
 * hash at `#/` where the router expects it.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
