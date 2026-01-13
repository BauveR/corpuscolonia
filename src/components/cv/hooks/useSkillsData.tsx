import { skillsSections } from "../data/cvData";
import { skillIconMap } from "../data/skillIcons";

// Custom hook that encapsulates skills data logic (Single Responsibility)
export function useSkillsData() {
  return {
    sections: skillsSections,
    iconMap: skillIconMap,
  };
}
