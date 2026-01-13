import { useEffect, useState, RefObject } from "react";

export type SectionId = string;

interface UseScrollSectionsOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
  rootMargin?: string;
}

/**
 * Hook para detectar qué sección está visible en el viewport
 * Usa scroll position para mobile y IntersectionObserver para desktop
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
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;

    // MOBILE: Usar scroll position (más confiable)
    if (isMobile) {
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const triggerPoint = scrollY + windowHeight * 0.3; // 30% desde arriba

            // Obtener todas las secciones y sus posiciones
            const sections = sectionIds
              .map(id => ({
                id,
                element: sectionRefs[id].current,
              }))
              .filter((s): s is { id: T; element: HTMLElement } => s.element !== null)
              .map(s => ({
                id: s.id,
                top: s.element.offsetTop,
                bottom: s.element.offsetTop + s.element.offsetHeight,
              }));

            // Encontrar la sección activa basada en scroll position
            let newActiveSection = sectionIds[0];

            for (let i = sections.length - 1; i >= 0; i--) {
              const section = sections[i];
              if (triggerPoint >= section.top) {
                newActiveSection = section.id;
                break;
              }
            }

            setActiveSection(newActiveSection);
            ticking = false;
          });
          ticking = true;
        }
      };

      // Llamar inmediatamente y en cada scroll
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    // DESKTOP: Usar IntersectionObserver (comportamiento original estable)
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);

        if (intersecting.length === 0) return;

        const mostVisible = intersecting.reduce((max, e) =>
          e.intersectionRatio > max.intersectionRatio ? e : max
        );

        const id = mostVisible.target.id as T;

        if (sectionIds.includes(id) && mostVisible.intersectionRatio > 0.2) {
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
