import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageSEO } from "../seo/PageSEO";
import { useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { Divider } from "../common/Divider";
import { WelcomeSection } from "../sections/WelcomeSection";
import { CVSection } from "../sections/CVSection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { RedesSection } from "../sections/RedesSection";
import { DocumentosModal } from "../documentos/DocumentosModal";
import GradualBlur from "../gradualBlur/GradualBlur";
import { useScrollSections } from "../../hooks/useScrollSections";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import { useInitialNavigation } from "../../hooks/useInitialNavigation";

type SectionId = "welcome" | "cv" | "documentos" | "redes";
const SECTION_IDS: SectionId[] = ["welcome", "cv", "documentos", "redes"];

export function ScrollShell() {
  const welcomeRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);
  const documentosRef = useRef<HTMLElement | null>(null);
  const redesRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, cv: cvRef, documentos: documentosRef, redes: redesRef }) as const,
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

  const { i18n } = useTranslation();
  const isEN = i18n.language.startsWith("en");

  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-full" style={{ backgroundColor: '#6E311E' }}>
      <PageSEO
        title="CORPUSCOLONIA — Colonialismo Corpóreo en el Atlántico"
        description={
          isEN
            ? "Research project on the biopolitical impact of colonialism on human remains in the Atlantic world: Canary Islands, Mexico, and the Netherlands."
            : "Proyecto de investigación sobre el impacto biopolítico del colonialismo en los restos humanos del mundo atlántico: Canarias, México y Holanda."
        }
        canonicalPath="/"
        lang={isEN ? "en" : "es"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ResearchProject",
          "name": "CORPUSCOLONIA",
          "alternateName": "Colonialismo Corpóreo",
          "description": "Proyecto de investigación sobre el impacto biopolítico del colonialismo en los restos humanos del mundo atlántico moderno en los casos de estudio de Canarias, México y Holanda.",
          "url": "https://corpuscolonia.com/",
          "image": "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_1200/v1768775626/corpus_colonia_desktop_t90sru.png",
          "foundingDate": "2024",
          "keywords": ["colonialismo", "biopolítica", "restos humanos", "atlántico", "historia colonial", "Canarias", "México", "Holanda"],
          "sponsor": [
            { "@type": "Organization", "name": "Universiteit Leiden", "url": "https://www.universiteitleiden.nl/" },
            { "@type": "Organization", "name": "Universidad de La Laguna", "url": "https://www.ull.es/" }
          ],
          "inLanguage": ["es", "en"]
        }}
      />
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
      <Divider height="h-10" />

      <RedesSection sectionRef={redesRef} />

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
