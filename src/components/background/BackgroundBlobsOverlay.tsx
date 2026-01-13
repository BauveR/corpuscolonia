import { motion } from "framer-motion";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

export const BackgroundBlobsOverlay = () => {
  // Rango de movimiento muy amplio para máxima cobertura
  const blob1 = useFloatingAnimation({ rangeX: 400, rangeY: 300, minDuration: 1.2, maxDuration: 2.8 });
  const blob2 = useFloatingAnimation({ rangeX: 350, rangeY: 280, minDuration: 1.5, maxDuration: 3.0 });
  const blob3 = useFloatingAnimation({ rangeX: 450, rangeY: 320, minDuration: 1.0, maxDuration: 2.5 });

  return (
    // Encima del contenido con z-10, pointer-events-none para no bloquear interacciones
    <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
      {/* Blob transparente grande con desenfoque intenso */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform backdrop-blurxl bg-white/10"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob1}
        style={{ top: "20%", left: "15%" }}
      />

      {/* Blob transparente mediano */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full will-change-transform backdrop-blur-3xl bg-white/10"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob2}
        style={{ top: "35%", left: "55%" }}
      />

      {/* Blob transparente pequeño */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full will-change-transform backdrop-blur-2xl bg-white/10"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob3}
        style={{ top: "50%", left: "30%" }}
      />
    </div>
  );
};
