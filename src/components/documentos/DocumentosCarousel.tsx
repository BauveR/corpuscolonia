import { useRef, useEffect, useState } from "react";
import type { TouchEvent } from "react";
import { DocumentosCard } from "./DocumentosCard";
import { useValidProjects } from "../../hooks/useValidProjects";

export const DocumentosCarousel = () => {
  const validProjects = useValidProjects();
  const items = validProjects.map((project, i) => ({
    id: String(i),
    index: i,
    name: project.text,
    description: project.longDescription,
    primaryImage: project.resolvedImage!,
    downloadUrl: project.downloadUrl,
  }));

  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardDims, setCardDims] = useState({ w: 300, h: 500, container: 570 });
  const containerRef = useRef<HTMLDivElement>(null);

  const n = items.length;

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        const w = Math.min(Math.round(window.innerWidth * 0.78), 340);
        const h = Math.round(w * 1.72);
        setCardDims({ w, h, container: h + 60 });
      } else {
        setCardDims({ w: 300, h: 500, container: 570 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isHovering || n === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView, isHovering, n]);

  const prev = () => setActive((p) => (p - 1 + n) % n);
  const next = () => setActive((p) => (p + 1) % n);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };

  const getStyle = (index: number): React.CSSProperties => {
    if (index === active)
      return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 20 };
    if (index === (active + 1) % n)
      return { transform: "translateX(40%) scale(0.95)", opacity: 0.6, zIndex: 10 };
    if (index === (active - 1 + n) % n)
      return { transform: "translateX(-40%) scale(0.95)", opacity: 0.6, zIndex: 10 };
    return { transform: "scale(0.9)", opacity: 0, zIndex: 0 };
  };

  if (n === 0) return null;

  return (
    <div className="w-full pt-6 pb-4 relative">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: cardDims.container }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Cards */}
        <div className="absolute inset-0 flex items-start justify-center">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="absolute top-0 transition-all duration-500"
              style={{ width: cardDims.w, height: cardDims.h, ...getStyle(index) }}
            >
              <DocumentosCard
                id={item.id}
                index={item.index}
                name={item.name}
                description={item.description}
                primaryImage={item.primaryImage}
                downloadUrl={item.downloadUrl}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next — solo desktop */}
        {!isMobile && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white shadow-md transition-all hover:scale-110"
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white shadow-md transition-all hover:scale-110"
              aria-label="Siguiente"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Ir a ${idx + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === idx ? 20 : 8,
                backgroundColor: active === idx ? "#FF8B00" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentosCarousel;
