import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { EducationItem } from "./ui/EducationItem";
import { containerVariants } from "./ui/motion";
import type { Study } from "./data/cvData";

type Props = { studies: Study[] };

export function Education({ studies }: Props) {
  return (
    <GlassPanel variants={containerVariants} className="h-full flex flex-col py-10">
      <SectionHeader>Educación</SectionHeader>

      <ul className="ms-4 sm:ms-8 grid gap-1 mt-4 text-sm">
        {studies.map((study, idx) => (
          <EducationItem key={idx} study={study} index={idx} />
        ))}
      </ul>
    </GlassPanel>
  );
}
