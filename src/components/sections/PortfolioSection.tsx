import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { DocumentosGrid } from "../documentos/DocumentosGrid";
import { ResearchGallery } from "../documentos/ResearchGallery";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  showPortfolio: boolean;
  onViewportEnter: () => void;
};

function PortfolioSkeleton() {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export function PortfolioSection({ sectionRef, showPortfolio, onViewportEnter }: Props) {
  return (
    <AnimatedSection
      id="documentos"
      ref={sectionRef}
      viewportAmount={0.25}
      onViewportEnter={onViewportEnter}
      minHeight="auto"
    >
      <div className="w-full flex flex-col lg:flex-row gap-8 px-16 lg:px-32 py-8">
        {/* Columna izquierda: Galería del portafolio */}
        <div className="w-full lg:w-[57%]">
          {showPortfolio ? <DocumentosGrid /> : <PortfolioSkeleton />}
        </div>

        {/* Columna derecha: Logo ResearchGate + Galería */}
        <div className="w-full lg:w-[43%]">
          <ResearchGallery />
        </div>
      </div>
    </AnimatedSection>
  );
}
