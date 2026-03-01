import { Helmet } from "react-helmet-async";
import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { TeamMemberCard } from "./collaborators/TeamMemberCard";
import { teamMembers } from "./collaborators/data";
import { TypingText } from "../common/TypingText";
import { GlowingCards, GlowingCard } from "../common/GlowingCards";
import { useTranslation } from "react-i18next";

export function CollaboratorsPage() {
  const { t } = useTranslation();
  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden max-w-full"
      style={{ backgroundColor: "#6E311E" }}
    >
      <Helmet>
        <title>Colaboradores — CORPUSCOLONIA</title>
        <meta name="description" content="Equipo de investigadores del proyecto CORPUSCOLONIA: una red de personas a través del Atlántico." />
        <link rel="canonical" href="https://corpuscolonia.vercel.app/collaborators" />
      </Helmet>
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
