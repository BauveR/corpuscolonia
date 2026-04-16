import { RefObject, lazy, Suspense } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { ScrollReveal } from "../common/ScrollReveal";
import { CVGallery } from "../cv/CVGallery";
import { useTranslation } from "react-i18next";
const figure5 = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_800/v1770911634/Imagen_grande_drw1xq.png";
import "./CVSection.css";

const ObjViewer3D = lazy(() => import("../cv/ObjViewer3D"));

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function CVSection({ sectionRef }: Props) {
  const { t } = useTranslation();
  return (
    <AnimatedSection
      id="cv"
      ref={sectionRef}
      viewportAmount={0.01}
      minHeight="auto"
    >
      <div className="relative w-full flex flex-col py-8 sm:py-20 bg-transparent gap-[7.8rem]">

        {/* Panel de vidrio — grid responsive: columna texto + columna 3D */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] px-3 sm:px-8 rounded-3xl py-10 sm:py-16 bg-slate-900/30 backdrop-blur-2xl shadow-xl shadow-black/20 border border-white/10 ring-1 ring-white/5 mx-auto w-[90%] max-w-full min-w-0 overflow-hidden">

          {/* Columna izquierda: texto */}
          <div className="flex flex-col justify-center items-center px-4">
            <div className="flex flex-col gap-10 text-stone-300 w-full sm:w-[70%] text-center">
              <ScrollReveal
                textClassName="font-anton text-[1.685rem] sm:text-2xl md:text-[2rem] lg:text-[2.8rem] text-center text-[#D5C5B0] leading-snug"
                baseOpacity={0}
                baseRotation={0}
                enableBlur={true}
                blurStrength={6}
                staggerDelay={0.06}
                threshold={0.3}
              >
                {t("cv.title")}
              </ScrollReveal>

              <ScrollReveal
                textClassName="text-sm md:text-lg leading-relaxed text-stone-300/80"
                baseOpacity={0}
                baseRotation={0}
                enableBlur={true}
                blurStrength={4}
                staggerDelay={0.03}
                threshold={0.2}
              >
                {t("cv.text")}
              </ScrollReveal>

              <div className="mt-2 sm:mt-6">
                <img
                  src={figure5}
                  alt="Redes atlánticas de intercambio"
                  className="w-full rounded-lg mb-3"
                  loading="lazy"
                  decoding="async"
                />
                <ScrollReveal
                  textClassName="text-stone-300/80 text-[0.6rem] sm:text-sm italic text-center"
                  baseOpacity={0}
                  baseRotation={0}
                  enableBlur={true}
                  blurStrength={4}
                  staggerDelay={0.05}
                  threshold={0.2}
                >
                  {t("cv.caption")}
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Columna derecha: modelo 3D — oculto en mobile, visible desde md: */}
          <div className="hidden md:flex items-center justify-center md:h-[420px] lg:h-[580px]">
            <Suspense fallback={null}>
              <ObjViewer3D />
            </Suspense>
          </div>

        </div>

        {/* Galería CV a ancho completo */}
        <div className="w-full">
          <CVGallery />
        </div>

      </div>
    </AnimatedSection>
  );
}
