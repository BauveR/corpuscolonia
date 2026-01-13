import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type NavigationCallback = (section: string, shouldShowPortfolio?: boolean) => void;

const INITIAL_SCROLL_MAP: Record<string, string> = {
  "/cv": "cv",
  "/portafolio": "portafolio",
  "/": "welcome",
};

/**
 * Hook para manejar la navegación inicial cuando se carga la app
 * @param onNavigate - Callback que se ejecuta con la sección destino
 */
export function useInitialNavigation(onNavigate: NavigationCallback) {
  const location = useLocation();
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (!firstLoadRef.current) return;
    firstLoadRef.current = false;

    const path = location.pathname;

    // Si es una ruta de portafolio, no hacer nada
    if (path.includes("/portafolio/")) return;

    // Determinar sección basada en el path
    const section = INITIAL_SCROLL_MAP[path] || "welcome";
    const shouldShowPortfolio = section === "portafolio";

    onNavigate(section, shouldShowPortfolio);
  }, [location.pathname, onNavigate]);
}
