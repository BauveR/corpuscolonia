import { useEffect } from "react";

/**
 * Hook para deshabilitar la restauración automática de scroll del navegador
 * Útil cuando se implementa scroll personalizado basado en secciones
 */
export function useScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
}
