import { motion } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";
import { VIEWPORT } from "../../../constants/animations";

interface AnimateOnViewProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  variants: Variants;
  viewportAmount?: number | "default" | "high" | "medium" | "low";
  children: React.ReactNode;
}

/**
 * Wrapper component que aplica animación cuando entra en viewport
 * Simplifica el patrón repetitivo de initial + whileInView + viewport
 */
export function AnimateOnView({
  variants,
  viewportAmount = "default",
  children,
  ...props
}: AnimateOnViewProps) {
  // Resolver viewport amount
  const amount = typeof viewportAmount === "string"
    ? VIEWPORT[viewportAmount].amount
    : viewportAmount;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
