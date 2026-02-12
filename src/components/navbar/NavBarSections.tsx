import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logoImage from "../../assets/colonial bio-02.png";

type SectionId = "welcome" | "cv" | "documentos";

type ScrollRoute = { kind: "scroll"; id: SectionId; label: string };
type LinkRoute = { kind: "link"; href: string; label: string };
type RouteItem = ScrollRoute | LinkRoute;

type Props = {
  active: SectionId | null;
  onGo: (id: SectionId) => void;
};

const routes: RouteItem[] = [
  { kind: "scroll", id: "welcome", label: "Inicio" },
  { kind: "scroll", id: "cv", label: "Proyecto" },
  { kind: "scroll", id: "documentos", label: "Eventos y documentos" },
  { kind: "link", href: "/collaborators", label: "Colaboradores" },
];

export default function NavbarSections({ active, onGo }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTitles, setShowTitles] = useState(false);

  const isOnMainPage = location.pathname === "/" || location.pathname.startsWith("/cv") || location.pathname.startsWith("/documentos");

  // Estabilizar el estado de los títulos con debounce e hysteresis
  useEffect(() => {
    const shouldShow = active !== "welcome" && active !== null;

    // Si vamos a mostrar, hacerlo más rápido (100ms)
    // Si vamos a ocultar, hacerlo más lento (400ms) para evitar parpadeos
    const delay = shouldShow ? 100 : 400;

    const timer = setTimeout(() => {
      setShowTitles(shouldShow);
    }, delay);

    return () => clearTimeout(timer);
  }, [active]);

  // Cambia estilo al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll cuando está abierto el drawer
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = mobileOpen ? "hidden" : prev;
    return () => {
      body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const linkBase =
    "relative px-2 py-1 text-sm md:text-[15px] tracking-wide transition-all duration-300";
  const linkActive =
    "text-white font-bold blur-none";
  const linkInactive =
    "text-stone-300 blur-[0.8px] hover:text-white hover:blur-none font-normal";

  const handleRoute = (item: RouteItem) => {
    setMobileOpen(false);
    if (item.kind === "link") {
      navigate(item.href);
    } else if (isOnMainPage) {
      onGo(item.id);
    } else {
      navigate(item.id === "welcome" ? "/" : `/${item.id}`);
    }
  };

  const isActive = (item: RouteItem) => {
    if (item.kind === "link") return location.pathname === item.href;
    return active === item.id;
  };

  return (
    <>
      <header
  className={[
    "fixed top-0 left-0 right-0 z-50 transition-colors pb-8",
    scrolled
      ? "bg-gradient-to-b from-orange-950/60 sm:from-orange-950/80 via-orange-900/30 sm:via-orange-900/40 to-transparent"
      : "bg-gradient-to-b from-orange-900/20 sm:from-orange-900/40 via-orange-900/10 sm:via-orange-900/15 to-transparent",
  ].join(" ")}
  role="banner"
>


        <nav className="w-full px-10">
          <div className="grid grid-cols-3 items-center h-[80px] md:h-[92px]">
            {/* LEFT: Burger (móvil) */}
            <div className="flex items-center gap-3">
              {/* Burger */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10"
                aria-label="Abrir menú"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* CENTER: logo / marca o títulos CV */}
            <div className="flex items-center justify-center h-[80px] md:h-[92px] relative overflow-hidden">
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showTitles ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: showTitles ? "auto" : "none" }}
              >
                <img
                  src={logoImage}
                  alt="Corpus Colonia"
                  className="h-[58px] md:h-[70px] w-auto object-contain"
                />
              </motion.div>
            </div>

            {/* RIGHT: Links (desktop) */}
            <div className="flex items-center justify-end pr-16">
              {/* Links desktop */}
              <div className="hidden lg:flex items-start gap-4">
                {routes.map((r) => {
                  const key = r.kind === "scroll" ? r.id : r.href;
                  const current = isActive(r);
                  return (
                    <button
                      key={key}
                      onClick={() => handleRoute(r)}
                      className={[
                        linkBase,
                        current ? linkActive : linkInactive,
                      ].join(" ")}
                      aria-current={current ? "page" : undefined}
                    >
                      <span className="relative">
                        {r.label}
                        <span
                          className="
                            absolute left-0 -bottom-0.5 w-full h-[2px] bg-white
                            origin-left scale-x-0
                            lg:group-hover:scale-x-100
                            transition-transform duration-300 ease-out
                          "
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[270px] bg-stone-500/50 text-stone-200 shadow-xl p-4"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              role="dialog"
              aria-label="Menú"
            >
              <div className="flex items-center justify-between h-12">
                <span className="text-lg tracking-wide"></span>
                <button
                  className="p-2 rounded-md hover:bg-white/10"
                  aria-label="Cerrar menú"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex flex-col">
                {routes.map((r) => {
                  const key = r.kind === "scroll" ? r.id : r.href;
                  const current = isActive(r);
                  return (
                    <button
                      key={key}
                      onClick={() => handleRoute(r)}
                      className={[
                        "py-3 text-base border-b border-white/10 text-left transition-all duration-300",
                        current
                          ? "text-white font-bold blur-none"
                          : "text-stone-300 hover:text-white blur-[0.8px] hover:blur-none font-normal",
                      ].join(" ")}
                      aria-current={current ? "page" : undefined}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
