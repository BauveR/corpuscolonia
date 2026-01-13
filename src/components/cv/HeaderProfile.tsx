import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./ui/motion";
import { AnimateOnView } from "./ui/AnimateOnView";

type Props = { title: React.ReactNode; subtitle: React.ReactNode; };

export function HeaderProfile({ title, subtitle }: Props) {
  return (
    <AnimateOnView
      variants={containerVariants}
      className="flex justify-start items-center gap-4"
    >
      <div className="ms-9 flex items-center gap-4 flex-wrap">
        <div className="flex flex-row items-center justify-start flex-wrap gap-2 mt-0">
          <motion.span variants={itemVariants}>{title}</motion.span>
          <motion.span variants={itemVariants}>{subtitle}</motion.span>
        </div>
      </div>
    </AnimateOnView>
  );
}
