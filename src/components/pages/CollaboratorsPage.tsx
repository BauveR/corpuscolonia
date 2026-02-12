import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { TeamMemberCard } from "./collaborators/TeamMemberCard";
import { teamMembers } from "./collaborators/data";

export function CollaboratorsPage() {
  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden max-w-full"
      style={{ backgroundColor: "#6E311E" }}
    >
      <NavbarSections active={null} onGo={() => {}} />

      <main className="flex-1 pt-[120px] pb-20 px-6 md:px-16 lg:px-24 max-w-[1680px] mx-auto w-full">
        <h1 className="font-anton text-xl sm:text-2xl md:text-[2rem] lg:text-[2.8rem] text-[#D5C5B0] tracking-wide mb-10">
          A NETWORK OF PEOPLE ACROSS AN OCEAN
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
