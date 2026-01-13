import { AboutMe } from "../AboutMe";
import { Experience } from "../Experience";

export function RightColumn() {
  return (
    <div className="flex flex-col gap-4">
      {/* Wrapper para Sobre mí y Experiencia */}
      <div className="flex flex-col gap-4 flex-1 mt-4 md:mt-[7.5rem]">
        <div className="flex-1">
          <AboutMe />
        </div>

        <div className="flex-1">
          <Experience />
        </div>
      </div>
    </div>
  );
}
