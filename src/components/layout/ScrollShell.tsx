import { useCallback, useMemo, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { Divider } from "../common/Divider";
import { WelcomeSection } from "../sections/WelcomeSection";
import { CVSection } from "../sections/CVSection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { DocumentosModal } from "../documentos/DocumentosModal";
import GradualBlur from "../gradualBlur/GradualBlur";
import { useScrollSections } from "../../hooks/useScrollSections";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import { useInitialNavigation } from "../../hooks/useInitialNavigation";

type SectionId = "welcome" | "cv" | "documentos";
const SECTION_IDS: SectionId[] = ["welcome", "cv", "documentos"];

export function ScrollShell() {
  const welcomeRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);
  const documentosRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, cv: cvRef, documentos: documentosRef }) as const,
    []
  );

  const [showPortfolio, setShowPortfolio] = useState(false);

  // Hooks personalizados para manejar scroll
  const activeSection = useScrollSections({ sectionIds: SECTION_IDS, sectionRefs: refs });
  const { scrollTo } = useScrollNavigation({ sectionIds: SECTION_IDS, sectionRefs: refs });
  useScrollRestoration();

  // Navegación inicial
  useInitialNavigation(
    useCallback((section: string, shouldShowPortfolio?: boolean) => {
      if (shouldShowPortfolio) setShowPortfolio(true);
      scrollTo(section as SectionId, true);
    }, [scrollTo])
  );

  const documentosMatch = useMatch("/documentos/:id");

  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-full" style={{ backgroundColor: '#6E311E' }}>
      <NavbarSections active={activeSection} onGo={scrollTo} />

      <WelcomeSection sectionRef={welcomeRef} />
      <Divider height="h-[54px]" />

      <CVSection sectionRef={cvRef} />
      <Divider height="h-10" />

      <PortfolioSection
        sectionRef={documentosRef}
        showPortfolio={showPortfolio}
        onViewportEnter={() => setShowPortfolio(true)}
      />

      <Footer />

      {/* GradualBlur effect on bottom of page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />

      <AnimatePresence>
        {documentosMatch && (
          <DocumentosModal key={`documentos-${documentosMatch.params?.id ?? "modal"}`} />
        )}
      </AnimatePresence>
    </div>
  );
}
