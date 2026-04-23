import { useLayoutEffect } from "react";
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


export function ThreeDPage() {
  const { i18n } = useTranslation();
  const isEN = i18n.language.startsWith("en");

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden max-w-full"
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


      {/* Grid ocupa todo el espacio restante */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0 relative pt-20">
        {/* Mandíbula */}
        <motion.div
          className="h-[50vh] md:h-full relative z-10"
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Model3DInteractive
            url={MANDIBULA_URL}
            normalizedSize={1}
            config={{
              cameraZ: 2.5,
              cameraY: 0.3,
              cameraFov: 35,
              autoRotateSpeed: 1.5,
              initialRotY: 2.3,
              initialRotX: -8,
            }}
          />
        </motion.div>

        {/* Cráneo */}
        <motion.div
          className="h-[50vh] md:h-full relative z-10"
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Model3DInteractive
            url={MODEL_URL}
            normalizedSize={1}
            config={{ cameraZ: 2.5, cameraY: 0.5, cameraFov: 35, autoRotateSpeed: 1.5 }}
          />
        </motion.div>
        {/* MetaBalls overlay — pointer-events:none en CSS, mouse tracked via document */}
        <MetaBalls
          color="#cec6ba"
          cursorBallColor="#F79A2B"
          cursorBallSize={1}
          ballCount={16}
          animationSize={35}
          enableMouseInteraction
          enableTransparency
          hoverSmoothness={0.088}
          clumpFactor={1}
          speed={0.3}
          opacity={0.8}
        />
      </div>

      <Footer gradientColor="#778ed8" />
    </div>
  );
}
