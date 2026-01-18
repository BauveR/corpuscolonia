import { useValidProjects } from "../../hooks/useValidProjects";
import { useRef } from "react";

export const CVGallery = () => {
  const validProjects = useValidProjects();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const items = validProjects.map((project, displayIndex) => ({
    id: String(displayIndex),
    index: displayIndex,
    name: project.text,
    description: project.longDescription,
    primaryImage: project.resolvedImage,
  }));

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -300, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Botón arriba */}
      <button
        onClick={scrollUp}
        className="absolute left-1/2 -translate-x-1/2 top-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
        aria-label="Scroll arriba"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Botón abajo */}
      <button
        onClick={scrollDown}
        className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
        aria-label="Scroll abajo"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Contenedor del carousel vertical */}
      <div
        ref={scrollContainerRef}
        className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-[650px] py-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-full h-[200px] bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex h-full">
              {/* Imagen a la izquierda */}
              <div className="w-1/3 h-full">
                <img
                  src={p.primaryImage!}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido a la derecha */}
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-3">
                  {p.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CVGallery;
