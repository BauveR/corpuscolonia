import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { CVGallery } from "../cv/CVGallery";
const figure5 = "https://res.cloudinary.com/dmweipuof/image/upload/v1770911634/Imagen_grande_drw1xq.png";
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
              <h2 className="font-anton text-xl sm:text-2xl md:text-[2rem] lg:text-[2.8rem] text-center md:text-left text-[#D5C5B0]">
                Redes atlánticas de intercambio
              </h2>

              <p className="text-xs sm:text-sm md:text-lg leading-relaxed">
                Un mapa de las conexiones que articularon el mundo atlántico moderno en los casos de estudio de este proyecto (Canarias, México y Holanda): circulación de personas, mercancías y tecnologías entre Europa, África y América. Estas redes no solo movieron productos —como azúcar, tabaco o metales— sino también cuerpos, conocimientos y formas de vida que transformaron profundamente las sociedades implicadas.
              </p>

              {/* Imagen con pie de foto */}
              <div className="mt-2 sm:mt-6">
                <img
                  src={figure5}
                  alt="Redes atlánticas de intercambio"
                  className="w-full rounded-lg mb-3"
                />
                <p className="text-white/80 text-[0.6rem] sm:text-sm italic text-center">
                  Redes atlánticas de intercambio
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
