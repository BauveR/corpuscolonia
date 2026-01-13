import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { PortafolioGrid } from "../portafolio/PortafolioGrid";

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
      id="portafolio"
      ref={sectionRef}
      viewportAmount={0.25}
      onViewportEnter={onViewportEnter}
    >
      <div className="w-full">
        {showPortfolio ? <PortafolioGrid /> : <PortfolioSkeleton />}
      </div>
    </AnimatedSection>
  );
}
