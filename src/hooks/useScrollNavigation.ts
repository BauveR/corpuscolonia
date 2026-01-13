import { useCallback, useEffect, RefObject } from "react";
import type { SectionId } from "./useScrollSections";

interface UseScrollNavigationOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
  onNavigate?: (sectionId: T) => void;
}

interface UseScrollNavigationReturn<T extends SectionId> {
  scrollTo: (id: T, replace?: boolean) => void;
}

/**
 * Hook para manejar navegación por scroll entre secciones
 * @param options - Configuración de secciones y refs
 * @returns Función scrollTo para navegar a una sección
 */
export function useScrollNavigation<T extends SectionId>({
  sectionIds,
  sectionRefs,
  onNavigate,
}: UseScrollNavigationOptions<T>): UseScrollNavigationReturn<T> {
  // Función para navegar a una sección específica
  const scrollTo = useCallback(
    (id: T, replace = false) => {
      const element = sectionRefs[id].current;
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth", block: "start" });

      const url = `/#${id}`;
      if (replace) {
        window.history.replaceState(null, "", url);
      } else {
        window.history.pushState(null, "", url);
      }

      onNavigate?.(id);
    },
    [sectionRefs, onNavigate]
  );

  // Manejar navegación con botón atrás del navegador
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) as T;
      if (sectionIds.includes(hash)) {
        scrollTo(hash);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [sectionIds, scrollTo]);

  return { scrollTo };
}
