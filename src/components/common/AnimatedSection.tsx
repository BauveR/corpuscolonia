import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { sectionVariants, VIEWPORT } from "../../constants/animations";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"section">, "variants"> {
  id: string;
  viewportAmount?: number;
  onViewportEnter?: () => void;
  children: React.ReactNode;
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
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={`min-h-screen px-0 scroll-mt-24 ${className}`.trim()}
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
