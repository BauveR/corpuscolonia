import { useEffect, useState, RefObject } from "react";

export type SectionId = string;

interface UseScrollSectionsOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
  rootMargin?: string;
}

/**
 * Hook para detectar qué sección está visible en el viewport
 * Usa IntersectionObserver para una detección eficiente y simple
 * @param options - Configuración de secciones y refs
 * @returns ID de la sección activa actualmente
 */
export function useScrollSections<T extends SectionId>({
  sectionIds,
  sectionRefs,
  rootMargin = "0px 0px -40% 0px",
}: UseScrollSectionsOptions<T>) {
  const [activeSection, setActiveSection] = useState<T>(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);

        if (intersecting.length === 0) return;

        const mostVisible = intersecting.reduce((max, e) =>
          e.intersectionRatio > max.intersectionRatio ? e : max
        );

        const id = mostVisible.target.id as T;

        if (sectionIds.includes(id) && mostVisible.intersectionRatio > 0.1) {
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    const elements = sectionIds
      .map(id => sectionRefs[id].current)
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, sectionRefs, rootMargin]);

  return activeSection;
}
