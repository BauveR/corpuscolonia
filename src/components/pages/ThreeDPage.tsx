import { useLayoutEffect, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import NavbarSections from "../navbar/NavBarSections";
import { PageSEO } from "../seo/PageSEO";
import { Model3DInteractive } from "../cv/Model3DInteractive";
import MetaBalls from "../common/MetaBalls/MetaBalls";
import { Footer } from "../footer/Footer";

const MODEL_URL =
  "https://res.cloudinary.com/dmweipuof/image/upload/v1776865262/modelo_compressed_gxx1rm.glb";

const MANDIBULA_URL =
  "https://res.cloudinary.com/dmweipuof/image/upload/v1776929777/mandibula_compressed_o7uxrt.glb";


// ── Mapa de breakpoints ──────────────────────────────────────────────────────
// Añade o edita filas para ajustar cada modelo en puntos de píxeles concretos.
// Los valores se interpolan automáticamente entre breakpoints adyacentes.
const MANDIBULA_BREAKPOINTS = [
  { w: 768,  cameraZ: 3.2, cameraY: 0.3, cameraFov: 35, normalizedSize: 1,   initialRotX: -8,  initialRotY: 2.3 },
  { w: 1280, cameraZ: 3.2, cameraY: 0.3, cameraFov: 35, normalizedSize: 1,   initialRotX: -8,  initialRotY: 2.3 },
  { w: 1366, cameraZ: 3.2, cameraY: 0.3, cameraFov: 35, normalizedSize: 1,   initialRotX: -8,  initialRotY: 2.3 },
  { w: 1920, cameraZ: 3.2, cameraY: 0.3, cameraFov: 35, normalizedSize: 1,   initialRotX: -8,  initialRotY: 2.3 },
];

const CRANEO_BREAKPOINTS = [
  { w: 768,  cameraZ: 2.9, cameraY: 0.5, cameraFov: 35, normalizedSize: 1 },
  { w: 1280, cameraZ: 2.9, cameraY: 0.5, cameraFov: 35, normalizedSize: 1 },
  { w: 1366, cameraZ: 2.9, cameraY: 0.5, cameraFov: 35, normalizedSize: 1 },
  { w: 1920, cameraZ: 2.9, cameraY: 0.5, cameraFov: 35, normalizedSize: 1 },
];

type BpEntry = Record<string, number> & { w: number };
function resolveConfig<T extends BpEntry>(breakpoints: T[], width: number): Omit<T, "w"> {
  const sorted = [...breakpoints].sort((a, b) => a.w - b.w);
  if (width <= sorted[0].w) return sorted[0];
  if (width >= sorted[sorted.length - 1].w) return sorted[sorted.length - 1];
  const hi = sorted.findIndex((bp) => bp.w >= width);
  const lo = hi - 1;
  const t = (width - sorted[lo].w) / (sorted[hi].w - sorted[lo].w);
  const result: Record<string, number> = {};
  for (const key of Object.keys(sorted[lo])) {
    if (key === "w") continue;
    result[key] = sorted[lo][key] + (sorted[hi][key] - sorted[lo][key]) * t;
  }
  return result as Omit<T, "w">;
}
// ─────────────────────────────────────────────────────────────────────────────

export function ThreeDPage() {
  const { i18n } = useTranslation();
  const isEN = i18n.language.startsWith("en");
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth >= 768 && window.innerWidth < 1280);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1280);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mandibulaCfg = resolveConfig(MANDIBULA_BREAKPOINTS, windowWidth);
  const craneoCfg    = resolveConfig(CRANEO_BREAKPOINTS,    windowWidth);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen xl:h-screen overflow-x-hidden xl:overflow-hidden max-w-full"
      style={{ backgroundColor: "#252d3f" }}
    >
      <PageSEO
        title="3D — CORPUSCOLONIA"
        description={
          isEN
            ? "3D models of skeletal remains from the CORPUSCOLONIA research project."
            : "Modelos 3D de restos óseos del proyecto de investigación CORPUSCOLONIA."
        }
        canonicalPath="/3d"
        lang={isEN ? "en" : "es"}
      />
      <NavbarSections active="cv" onGo={() => {}} gradientColor="#778ed8" />


      {/* Wrapper ocupa espacio restante — full width para MetaBalls */}
      <div className="flex-1 relative min-h-0 pt-20 md:pt-28 md:landscape:pt-16 lg:pt-20">

        {/* Grid limitado al mismo ancho que las secciones del home */}
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:h-full max-w-[1632px] mx-auto w-full px-3 md:px-10 lg:px-24 xl:gap-x-0">

          {/* Mandíbula */}
          <motion.div
            className="h-[40vh] md:h-[45vh] md:landscape:h-[65vh] xl:h-full relative z-10"
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Model3DInteractive
              url={MANDIBULA_URL}
              normalizedSize={mandibulaCfg.normalizedSize}
              config={{
                cameraZ: mandibulaCfg.cameraZ,
                cameraY: mandibulaCfg.cameraY,
                cameraFov: mandibulaCfg.cameraFov,
                autoRotateSpeed: 1.5,
                initialRotY: mandibulaCfg.initialRotY,
                initialRotX: mandibulaCfg.initialRotX,
              }}
            />
          </motion.div>

          {/* Cráneo */}
          <motion.div
            className="h-[40vh] md:h-[45vh] md:landscape:h-[65vh] xl:h-full relative z-10"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Model3DInteractive
              url={MODEL_URL}
              normalizedSize={craneoCfg.normalizedSize}
              config={{
                cameraZ: craneoCfg.cameraZ,
                cameraY: craneoCfg.cameraY,
                cameraFov: craneoCfg.cameraFov,
                autoRotateSpeed: 1.5,
              }}
            />
          </motion.div>
        </div>

        {/* MetaBalls — cubre todo el wrapper, pointer-events:none en CSS */}
        <MetaBalls
          color="#cec6ba"
          cursorBallColor="#F79A2B"
          cursorBallSize={1}
          ballCount={16}
          animationSize={isMobile ? 55 : 35}
          enableMouseInteraction
          enableTransparency
          hoverSmoothness={0.088}
          clumpFactor={1}
          speed={0.3}
          opacity={0.8}
          style={{ top: isMobile ? "8%" : isTablet ? "0%" : "28%" }}
        />
      </div>

      <Footer gradientColor="#778ed8" />
    </div>
  );
}
