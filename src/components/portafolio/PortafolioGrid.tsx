import { PortafolioCard } from "./PortafolioCard";
import { useValidProjects } from "../../hooks/useValidProjects";
import { useRef } from "react";

export const PortafolioGrid = () => {
  const validProjects = useValidProjects();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const items = validProjects.map((project, displayIndex) => ({
    id: String(displayIndex),
    index: displayIndex,
    name: project.text,
    description: project.longDescription,
    primaryImage: project.resolvedImage,
  }));

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.935 : 587; // 93.5vw o 581px + 6px gap
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.935 : 587; // 93.5vw o 581px + 6px gap
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full pt-16 pb-12 relative">
      {/* Botón izquierdo */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
        aria-label="Scroll izquierda"
      >
        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Botón derecho */}
      <button
        onClick={scrollRight}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
        aria-label="Scroll derecha"
      >
        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Contenedor del carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-[1.05rem] sm:px-[1.575rem] lg:px-[2.1rem] pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[93.5vw] h-[calc(93.5vw*1.67)] sm:w-[440px] sm:h-[734px] md:w-[581px] md:h-[968px]"
          >
            <PortafolioCard
              id={p.id}
              index={p.index}
              name={p.name}
              description={p.description}
              primaryImage={p.primaryImage!}
              className="h-full w-full"
            />
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-sm opacity-70 mt-10 px-[1.05rem]">
          No se han podido resolver imágenes. Revisa <code>src/components/portafolio/projects.ts</code> y que existan los assets.
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PortafolioGrid;
