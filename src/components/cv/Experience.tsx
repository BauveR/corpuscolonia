import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { containerVariants, itemVariants } from "./ui/motion";
import { experienceList } from "./data/cvData";

export function Experience() {
  return (
    <GlassPanel variants={containerVariants} className="h-full flex flex-col">
      <SectionHeader>Experiencia</SectionHeader>
      <div className="ms-4 sm:ms-8 mt-6 mb-8 space-y-6 text-sm text-slate-400">
        {experienceList.map((exp, i) => (
          <motion.div key={i} className="space-y-1" variants={itemVariants}>
            <p className="font-bold text-slate-400 text-base md:text-sm">{exp.title}</p>
            {exp.place && <p className="font-bold text-stone-50 text-sm md:text-base">{exp.place}</p>}
            {exp.desc && <p className="text-stone-300">{exp.desc}</p>}

            {exp.extra && (
              <motion.p
                style={{ originX: 0.5, originY: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mt-6 text-xl sm:text-lg md:text-3xl font-bold 
                  bg-gradient-to-r from-orange-500 to-blue-300 
                  hover:from-blue-200 hover:to-orange-500
                  bg-clip-text text-transparent transition-all duration-500
                  motion-reduce:transform-none"
              >
                {exp.extra}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
