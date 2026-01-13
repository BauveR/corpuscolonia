import { motion } from "framer-motion";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

export const BackgroundBlobsLight = () => {
  const a = useFloatingAnimation({ rangeX: 120, rangeY: 120, scaleRange: 0.25, minDuration: 1, maxDuration: 2.2 });
  const b = useFloatingAnimation({ rangeX: 100, rangeY: 100, scaleRange: 0.25, minDuration: 1, maxDuration: 2.2 });
  const c = useFloatingAnimation({ rangeX: 140, rangeY: 140, scaleRange: 0.25, minDuration: 1, maxDuration: 2.2 });

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
      {/* Capa de base muy sutil (evita “blancos puros” con blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.0] to-transparent" />
      {/* Blobs */}
      <motion.div
        className="absolute w-[560px] h-[560px] rounded-full bg-white/[0.09] blur-3xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={a}
        style={{ top: "8%", left: "18%" }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-blue-300/[0.15] blur-2xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={b}
        style={{ top: "30%", left: "56%" }}
      />
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full bg-cyan-300/[0.12] blur-3xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={c}
        style={{ top: "55%", left: "34%" }}
      />
    </div>
  );
};
