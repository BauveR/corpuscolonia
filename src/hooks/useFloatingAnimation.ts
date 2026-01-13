import { useAnimation } from "framer-motion";
import { useEffect } from "react";

interface FloatingAnimationOptions {
  rangeX: number;
  rangeY: number;
  scaleRange?: number;
  minDuration?: number;
  maxDuration?: number;
}

/**
 * Hook para crear animaciones floating/blob con movimiento aleatorio
 * @param options - Configuración de la animación
 * @returns Animation controls de Framer Motion
 */
export function useFloatingAnimation({
  rangeX,
  rangeY,
  scaleRange = 0.4,
  minDuration = 0.8,
  maxDuration = 2.3,
}: FloatingAnimationOptions) {
  const controls = useAnimation();

  useEffect(() => {
    let isActive = true;

    const getRandomPosition = (range: number) => {
      return Math.floor(Math.random() * range * 2) - range;
    };

    const animate = async () => {
      while (isActive) {
        const x = getRandomPosition(rangeX);
        const y = getRandomPosition(rangeY);
        const scale = 1 + Math.random() * scaleRange;
        const duration = Math.random() * (maxDuration - minDuration) + minDuration;

        await controls.start({
          x,
          y,
          scale,
          transition: {
            duration,
            ease: "easeInOut",
          },
        });
      }
    };

    animate();

    return () => {
      isActive = false;
    };
  }, [controls, rangeX, rangeY, scaleRange, minDuration, maxDuration]);

  return controls;
}
