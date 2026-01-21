import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { CVGallery } from "../cv/CVGallery";
import figure5 from "../../assets/Figure 5.png";
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
      <div className="w-full flex items-center justify-center py-8 sm:py-20 bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8" style={{ width: '120%', height: '98%', maxWidth: '100vw' }}>
          {/* Columna izquierda: Textos */}
          <div className="flex flex-col justify-center items-center px-4">
            <div className="flex flex-col gap-10 text-white w-full sm:w-[70%] text-justify" style={{ wordSpacing: '-0.02em', textJustify: 'inter-word' }}>
              <div>
                <h2 className="text-xs sm:text-sm md:text-lg mb-5 text-center text-[#D5C5B0]">
                  Colonialismo Corpóreo (CORPUSCOLONIA): el impacto biopolítico del colonialismo en los restos humanos del mundo atlántico
                </h2>
                <p className="text-xs sm:text-sm md:text-lg leading-relaxed">
                  Combinamos ciencia arqueológica, tecnología y experimentación para entender cómo vivieron, sufrieron y resistieron las personas durante la colonización europea.
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm md:text-lg mb-5 text-center text-[#D5C5B0]">
                  Un puente entre la Historia y el presente
                </h3>
                <p className="text-xs sm:text-sm md:text-lg leading-relaxed">
                  Queremos llevar la investigación más allá del laboratorio: al arte, a los museos y a las aulas, para reflexionar juntas sobre cómo el efecto que han tenido estas desigualdades hasta hoy.
                </p>
              </div>

              {/* Imagen con pie de foto */}
              <div className="mt-2 sm:mt-6">
                <img
                  src={figure5}
                  alt="Dibujo de Leonardo Torriani (1592)"
                  className="w-full rounded-lg mb-3"
                />
                <p className="text-white/80 text-[0.6rem] sm:text-sm italic text-center">
                  Dibujo de Leonardo Torriani (1592) que representa su visión de las luchas rituales realizadas por los hombres indígenas de Gran Canaria
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha: Galería CV */}
          <div className="flex items-center justify-center sm:justify-start">
            <div className="w-full sm:w-[90%]">
              <CVGallery />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
