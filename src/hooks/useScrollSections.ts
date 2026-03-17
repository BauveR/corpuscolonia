import { useEffect, useState, RefObject } from "react";

export type SectionId = string;

interface UseScrollSectionsOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
}

/**
 * Detecta la sección activa comparando la posición real de cada sección
 * en cada evento scroll. La activa es la última cuyo top ha cruzado el 45%
 * del viewport hacia arriba (orden en sectionIds = orden en la página).
 */
export function useScrollSections<T extends SectionId>({
  sectionIds,
  sectionRefs,
}: UseScrollSectionsOptions<T>) {
  const [activeSection, setActiveSection] = useState<T | null>(null);

  useEffect(() => {
    const detect = () => {
      const threshold = window.innerHeight * 0.45;
      let result: T | null = null;

      for (const id of sectionIds) {
        const el = sectionRefs[id].current;
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          result = id;
        }
      }

      setActiveSection((prev) => (prev === result ? prev : result));
    };

    window.addEventListener("scroll", detect, { passive: true });
    // Detectar sección inicial tras un frame para que el layout esté listo
    const timer = setTimeout(detect, 100);

    return () => {
      window.removeEventListener("scroll", detect);
      clearTimeout(timer);
    };
  }, [sectionIds, sectionRefs]);

  return activeSection as T | null;
}
