import { motion } from "framer-motion";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

export const BackgroundBlobs = () => {
  // Rango de movimiento suave para evitar que se "salgan" visualmente
  const blob1 = useFloatingAnimation({ rangeX: 140, rangeY: 140 });
  const blob2 = useFloatingAnimation({ rangeX: 120, rangeY: 120 });
  const blob3 = useFloatingAnimation({ rangeX: 140, rangeY: 140 });

  return (
    // IMPORTANTE: absolute (no fixed), pointer-events-none y -z-10
    // para que no se corte por transform/overflow del contenedor animado
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
      {/* Blob grande */}
      <motion.div
        className="absolute w-[640px] h-[640px] bg-stone-300 rounded-full blur-3xl opacity-10 will-change-transform"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob1}
        style={{ top: "15%", left: "18%" }}
      />

      {/* Blob mediano */}
      <motion.div
        className="absolute w-[440px] h-[440px] bg-blue-400 rounded-full blur-2xl opacity-20 will-change-transform"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob2}
        style={{ top: "28%", left: "52%" }}
      />

      {/* Blob pequeño */}
      <motion.div
        className="absolute w-[320px] h-[320px] bg-blue-300 rounded-full blur-3xl opacity-25 will-change-transform"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob3}
        style={{ top: "38%", left: "34%" }}
      />
    </div>
  );
};
