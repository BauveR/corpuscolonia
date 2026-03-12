import { useLayoutEffect } from "react";
import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { TeamMemberCard } from "./collaborators/TeamMemberCard";
import { teamMembers } from "./collaborators/data";
import { TypingText } from "../common/TypingText";
import { GlowingCards, GlowingCard } from "../common/GlowingCards";
import { useTranslation } from "react-i18next";
import { PageSEO } from "../seo/PageSEO";

export function CollaboratorsPage() {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language.startsWith("en");

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden max-w-full"
      style={{ backgroundColor: "#6E311E" }}
    >
      <PageSEO
        title={isEN ? "Collaborators — CORPUSCOLONIA" : "Colaboradores — CORPUSCOLONIA"}
        description={
          isEN
            ? "A network of researchers across three continents studying the biopolitical traces of Atlantic colonialism on human remains."
            : "Una red de investigadores en tres continentes que estudian las huellas biopolíticas del colonialismo atlántico en los restos humanos."
        }
        canonicalPath="/collaborators"
        lang={isEN ? "en" : "es"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": isEN ? "CORPUSCOLONIA Collaborators" : "Colaboradores — CORPUSCOLONIA",
          "description": isEN
            ? "Research team of CORPUSCOLONIA: a network of researchers studying Atlantic colonialism and its biopolitical impact on human remains."
            : "Equipo investigador de CORPUSCOLONIA: red de investigadores que estudian el colonialismo atlántico y su impacto biopolítico en los restos humanos.",
          "url": "https://corpuscolonia.com/collaborators",
          "isPartOf": { "@type": "ResearchProject", "name": "CORPUSCOLONIA", "url": "https://corpuscolonia.com/" }
        }}
      />
      <NavbarSections active={null} onGo={() => {}} />

      <main className="flex-1 pt-[120px] pb-20 px-6 md:px-16 lg:px-24 max-w-[1680px] mx-auto w-full">
        <TypingText
          as="h1"
          className="font-anton text-xl sm:text-2xl md:text-[2rem] lg:text-[2.8rem] text-[#F79A2B] tracking-wide mb-10"
          duration={2.5}
          delay={0.2}
        >
          {t("collaborators.title")}
        </TypingText>

        <GlowingCards containerClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <GlowingCard
              key={member.id}
              glowColor="#FF8B00"
              className="flex flex-col items-center text-center p-6 bg-slate-900/30 backdrop-blur-2xl shadow-xl shadow-black/20 border border-white/10 ring-1 ring-white/5 rounded-3xl text-stone-300"
            >
              <TeamMemberCard member={member} index={i} />
            </GlowingCard>
          ))}
        </GlowingCards>
      </main>

      <Footer />
    </div>
  );
}
