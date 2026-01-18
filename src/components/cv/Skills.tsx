import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { SkillSection } from "./ui/SkillSection";
import { useSkillsData } from "./hooks/useSkillsData";
import { containerVariants } from "./ui/motion";

export function Skills() {
  const { sections, iconMap } = useSkillsData();

  return (
    <GlassPanel variants={containerVariants} viewportAmount={0.3} className="h-full flex flex-col py-10">
      <SectionHeader>Skills</SectionHeader>

      <div className="ms-4 sm:ms-8 mt-6 mb-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-20 gap-y-6 sm:gap-y-8 text-sm sm:text-base">
        {sections.map((section, i) => (
          <SkillSection key={i} section={section} index={i} iconMap={iconMap} />
        ))}
      </div>
    </GlassPanel>
  );
}
