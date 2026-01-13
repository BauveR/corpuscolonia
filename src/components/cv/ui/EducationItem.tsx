import { motion } from "framer-motion";
import { itemVariants } from "./motion";
import type { Study } from "../data/cvData";

type Props = { study: Study; index: number };

export function EducationItem({ study, index }: Props) {
  return (
    <motion.li
      key={index}
      className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3"
      variants={itemVariants}
    >
      <div>
        <p className="font-bold text-slate-400">{study.title}</p>
        <p className="text-stone-50">{study.place}</p>
      </div>
      <div>
        <p className="text-orange-400">{study.year}</p>
      </div>
    </motion.li>
  );
}
