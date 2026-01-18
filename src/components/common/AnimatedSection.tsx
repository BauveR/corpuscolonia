import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { sectionVariants, VIEWPORT } from "../../constants/animations";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"section">, "variants"> {
  id: string;
  viewportAmount?: number;
  onViewportEnter?: () => void;
  children: React.ReactNode;
  minHeight?: "screen" | "auto";
}

/**
 * Componente de sección animada reutilizable
 * Aplica animaciones consistentes para todas las secciones principales de la app
 */
export function AnimatedSection({
  id,
  viewportAmount = VIEWPORT.default.amount,
  onViewportEnter,
  children,
  className = "",
  minHeight = "screen",
  ...props
}: AnimatedSectionProps) {
  const minHeightClass = minHeight === "screen" ? "min-h-screen" : "min-h-0";

  return (
    <motion.section
      id={id}
      className={`${minHeightClass} px-0 scroll-mt-24 ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={sectionVariants}
      onViewportEnter={onViewportEnter}
      {...props}
    >
      {children}
    </motion.section>
  );
}
