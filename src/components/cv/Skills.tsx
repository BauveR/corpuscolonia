import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";
import { SkillSection } from "./ui/SkillSection";
import { useSkillsData } from "./hooks/useSkillsData";
import { containerVariants, itemVariants } from "./ui/motion";

export function Skills() {
  const { sections, iconMap } = useSkillsData();

  return (
    <GlassPanel variants={containerVariants} viewportAmount={0.3} className="h-full flex flex-col py-10">
      <motion.h2
        className="ms-4 sm:ms-8 text-2xl sm:text-3xl font-bold text-stone-400"
        variants={itemVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Skills
      </motion.h2>

      <div className="ms-4 sm:ms-8 mt-6 mb-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-20 gap-y-6 sm:gap-y-8 text-sm">
        {sections.map((section, i) => (
          <SkillSection key={i} section={section} index={i} iconMap={iconMap} />
        ))}
      </div>
    </GlassPanel>
  );
}
