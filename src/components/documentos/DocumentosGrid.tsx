import { DocumentosCard } from "./DocumentosCard";
import { useValidProjects } from "../../hooks/useValidProjects";
import { useRef } from "react";

export const DocumentosGrid = () => {
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
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.6545 : 411; // 65.45vw o 406.7px + 4.2px gap
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.6545 : 411; // 65.45vw o 406.7px + 4.2px gap
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full pt-9 pb-6 relative">
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
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-[0.735rem] sm:px-[1.1rem] lg:px-[1.47rem] pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[65.45vw] h-[calc(65.45vw*1.67)] sm:w-[308px] sm:h-[514px] md:w-[407px] md:h-[678px]"
          >
            <DocumentosCard
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
        <div className="text-center text-sm opacity-70 mt-6 px-[0.735rem]">
          No se han podido resolver imágenes. Revisa <code>src/components/documentos/projects.ts</code> y que existan los assets.
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

export default DocumentosGrid;
