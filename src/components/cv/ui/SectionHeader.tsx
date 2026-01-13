import { motion } from "framer-motion";
import { itemVariants } from "./motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeader({ children, className = "" }: Props) {
  return (
    <motion.h2
      className={["ms-8 text-3xl font-bold text-stone-400", className].join(" ")}
      variants={itemVariants}
    >
      {children}
    </motion.h2>
  );
}
