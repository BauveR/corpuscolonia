import { motion } from "framer-motion";
import { itemVariants } from "./motion";
import type { SkillSection as SkillSectionType } from "../data/cvData";
import type { ReactElement } from "react";

type Props = {
  section: SkillSectionType;
  index: number;
  iconMap: Record<string, ReactElement>;
};

export function SkillSection({ section, index, iconMap }: Props) {
  return (
    <motion.div
      key={index}
      variants={itemVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="font-bold text-slate-400 mb-2">{section.title}</h3>
      <ul className="space-y-2">
        {section.items.map((item, j) => (
          <li key={j} className="flex items-center gap-2 text-stone-50">
            {iconMap[item] && <span className="w-5 h-5">{iconMap[item]}</span>}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
