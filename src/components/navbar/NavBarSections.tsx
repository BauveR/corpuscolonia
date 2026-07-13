import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/colonial bio-02.png";
import SparkleNavbar from "./SparkleNavbar";

type SectionId = "welcome" | "cv" | "documentos" | "redes";

type ScrollRoute = { kind: "scroll"; id: SectionId; label: string };
type LinkRoute = { kind: "link"; href: string; label: string };
type RouteItem = ScrollRoute | LinkRoute;

// Persiste entre desmontajes/montajes al navegar entre páginas
let globalPending: SectionId | null = null;

type Props = {
  active: SectionId | null;
  onGo: (id: SectionId) => void;
  gradientColor?: string;
};

export default function NavbarSections({ active, onGo, gradientColor }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const routes: RouteItem[] = [
    { kind: "scroll", id: "welcome", label: t("nav.home") },
    { kind: "scroll", id: "cv", label: t("nav.project") },
    { kind: "scroll", id: "documentos", label: t("nav.events") },
    { kind: "scroll", id: "redes", label: t("nav.networks") },
    { kind: "link", href: "/collaborators", label: t("nav.collaborators") },
    { kind: "link", href: "/3d", label: t("nav.threeD") },
  ];

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith("es") ? "en" : "es");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTitles, setShowTitles] = useState(false);
  const [pendingSection, setPendingSection] = useState<SectionId | null>(() => globalPending);

  const setPending = (s: SectionId | null) => {
    globalPending = s;
    setPendingSection(s);
  };

  const isOnMainPage = location.pathname === "/" || location.pathname.startsWith("/cv") || location.pathname.startsWith("/documentos") || location.pathname.startsWith("/redes");

  // Libera el pending en cuanto el scroll listener confirma la sección destino
  useEffect(() => {
    if (pendingSection && active === pendingSection) setPending(null);
  }, [active, pendingSection]);

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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleRoute = (item: RouteItem) => {
    setMobileOpen(false);
    if (item.kind === "link") {
      setPending(null);
      navigate(item.href);
    } else {
      setPending(item.id);
      if (isOnMainPage) {
        onGo(item.id);
      } else {
        navigate(item.id === "welcome" ? "/" : `/${item.id}`);
      }
    }
  };

  // La sección efectiva: pending ancla el indicador hasta que el observer confirme
  const effectiveActive = pendingSection ?? active;

  const isActive = (item: RouteItem) => {
    if (item.kind === "link") return location.pathname === item.href;
    return effectiveActive === item.id;
  };

  return (
    <>
      <header
  className={[
    "fixed top-0 left-0 right-0 z-50 transition-colors pb-8",
    !gradientColor && (scrolled
      ? "bg-gradient-to-b from-orange-950/80 via-orange-900/40 to-transparent"
      : "bg-gradient-to-b from-orange-900/40 via-orange-900/15 to-transparent"),
  ].filter(Boolean).join(" ")}
  style={gradientColor ? {
    background: scrolled
      ? `linear-gradient(to bottom, ${gradientColor}cc, ${gradientColor}66, transparent)`
      : `linear-gradient(to bottom, ${gradientColor}66, ${gradientColor}26, transparent)`
  } : undefined}
  role="banner"
>


        <nav className="w-full px-10">
          <div className="grid grid-cols-3 items-center h-[80px] md:h-[92px]">
            {/* LEFT: Burger (móvil) */}
            <div className="flex items-center gap-3">
              {/* Burger */}
              <button
                className="xl:hidden p-2 rounded-md hover:bg-white/10 text-white"
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
            <div className="flex items-center justify-center h-[80px] md:h-[92px] relative">
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

            {/* RIGHT: Links (desktop) con SparkleNavbar + lang switcher */}
            <div className="hidden xl:flex items-center justify-end pr-16 gap-4">
              <SparkleNavbar
                items={routes.map((r) => ({
                  label: r.label,
                  key: r.kind === "scroll" ? r.id : r.href,
                }))}
                activeIndex={(() => {
                  const found = routes.findIndex((r) => isActive(r));
                  if (found >= 0) return found;
                  const seg = location.pathname.replace(/^\//, "") || "welcome";
                  const byUrl = routes.findIndex(r => r.kind === "scroll" && r.id === seg);
                  return byUrl >= 0 ? byUrl : 0;
                })()}
                onItemClick={(index) => handleRoute(routes[index])}
                color="#ffffff"
              />
              <button
                onClick={toggleLang}
                className="text-xs font-semibold tracking-widest text-stone-300 hover:text-white transition-colors duration-300 uppercase border border-white/20 rounded-md px-2 py-1"
              >
                {i18n.language.startsWith("es") ? "EN" : "ES"}
              </button>
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
              className="fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[270px] bg-gradient-to-r from-[oklch(40.8%_0.123_38.172/0.8)] to-transparent text-stone-200 shadow-xl p-4"
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
                <button
                  onClick={toggleLang}
                  className="mt-4 self-start text-xs font-semibold tracking-widest text-stone-300 hover:text-white transition-colors duration-300 uppercase border border-white/20 rounded-md px-2 py-1"
                >
                  {i18n.language.startsWith("es") ? "EN" : "ES"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
