import type { Variants, Transition } from "framer-motion";

// ===== EASINGS =====
export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as const,
  easeOut: "easeOut" as const,
  easeInOut: "easeInOut" as const,
} as const;

// ===== DURATIONS =====
export const DURATION = {
  section: 0.6,
  container: 0.5,
  item: 0.35,
  modal: 0.25,
  fast: 0.2,
} as const;

// ===== STAGGER =====
export const STAGGER = {
  children: 0.08,
  delay: 0.10,
} as const;

// ===== FACTORY FUNCTIONS =====

/**
 * Crea variants de fade-in con desplazamiento vertical
 * @param yOffset - Desplazamiento en Y (default: 16)
 * @param duration - Duración de la animación (default: 0.5)
 * @param ease - Función de easing (default: "easeOut")
 */
export const createFadeInVariants = (
  yOffset = 16,
  duration = DURATION.container,
  ease: any = EASING.easeOut
): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});

/**
 * Crea variants de fade-in para contenedores con stagger de hijos
 * @param yOffset - Desplazamiento en Y (default: 16)
 * @param duration - Duración de la animación (default: 0.5)
 * @param staggerChildren - Delay entre hijos (default: 0.08)
 * @param delayChildren - Delay inicial antes de animar hijos (default: 0.10)
 */
export const createContainerVariants = (
  yOffset = 16,
  duration = DURATION.container,
  staggerChildren = STAGGER.children,
  delayChildren = STAGGER.delay
): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: EASING.easeOut,
      when: "beforeChildren",
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Crea variants de fade-in para items hijos
 * @param yOffset - Desplazamiento en Y (default: 10)
 * @param duration - Duración de la animación (default: 0.35)
 */
export const createItemVariants = (
  yOffset = 10,
  duration = DURATION.item
): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASING.easeOut },
  },
});

// ===== VARIANTS PREDEFINIDOS =====

export const containerVariants: Variants = createContainerVariants();
export const itemVariants: Variants = createItemVariants();

// Variants para secciones principales
export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.section,
      ease: EASING.smooth,
    },
  },
};

// Variants para modales
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContentVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.item,
      ease: EASING.smooth,
    },
  },
  exit: { y: 20, opacity: 0 },
};

// ===== TRANSITIONS =====

export const smoothTransition: Transition = {
  duration: DURATION.section,
  ease: EASING.smooth,
};

export const fastTransition: Transition = {
  duration: DURATION.fast,
  ease: EASING.easeOut,
};

// ===== VIEWPORT CONFIGS =====

export const VIEWPORT = {
  default: { once: true, amount: 0.35 as const },
  high: { once: true, amount: 0.45 as const },
  medium: { once: true, amount: 0.3 as const },
  low: { once: true, amount: 0.25 as const },
} as const;
