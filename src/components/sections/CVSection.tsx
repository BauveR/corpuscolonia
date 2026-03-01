import { RefObject } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../common/AnimatedSection";
import { ScrollReveal } from "../common/ScrollReveal";
import { CVGallery } from "../cv/CVGallery";
const figure5 = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_800/v1770911634/Imagen_grande_drw1xq.png";
import "./CVSection.css";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function CVSection({ sectionRef }: Props) {
  return (
    <AnimatedSection
      id="cv"
      ref={sectionRef}
      viewportAmount={0.01}
      minHeight="auto"
    >
      <div className="w-full flex flex-col py-8 sm:py-20 bg-transparent gap-[7.8rem]">

        {/* Fila superior: columna izquierda (textos) + columna derecha (vacía) */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 px-8" style={{ maxWidth: '100vw' }}>
          {/* Columna izquierda: Textos */}
          <div className="flex flex-col justify-center items-center px-4">
            <div className="flex flex-col gap-10 text-stone-300 w-full sm:w-[70%] text-justify" style={{ wordSpacing: '-0.02em', textJustify: 'inter-word' }}>
              <ScrollReveal
                textClassName="font-anton text-xl sm:text-2xl md:text-[2rem] lg:text-[2.8rem] text-center md:text-left text-[#D5C5B0]"
                baseOpacity={0}
                baseRotation={0}
                enableBlur={true}
                blurStrength={6}
                staggerDelay={0.06}
                threshold={0.3}
              >
                Redes atlánticas de intercambio
              </ScrollReveal>

              <ScrollReveal
                textClassName="text-xs sm:text-sm md:text-lg leading-relaxed text-stone-300"
                baseOpacity={0}
                baseRotation={0}
                enableBlur={true}
                blurStrength={4}
                staggerDelay={0.03}
                threshold={0.2}
              >
                Un mapa de las conexiones que articularon el mundo atlántico moderno en los casos de estudio de este proyecto (Canarias, México y Holanda): circulación de personas, mercancías y tecnologías entre Europa, África y América. Estas redes no solo movieron productos —como azúcar, tabaco o metales— sino también cuerpos, conocimientos y formas de vida que transformaron profundamente las sociedades implicadas.
              </ScrollReveal>

              {/* Imagen con pie de foto */}
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
                  Redes atlánticas de intercambio
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Columna derecha: SVG giratorio */}
          <div className="hidden lg:flex items-center justify-center" style={{ perspective: "800px", transform: "translate(-160px, -40px)" }}>
            <motion.img
              src="https://res.cloudinary.com/dmweipuof/image/upload/v1771880596/corpus_colonia-01_t98bot.svg"
              alt="Corpus Colonia"
              className="w-[499px] h-[499px] sm:w-[624px] sm:h-[624px]"
              animate={{ rotateY: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              draggable={false}
            />
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
