import { B1 } from "./B1";
import { B2 } from "./B2";
import { B3 } from "./B3";
import { B4 } from "./B4";
import { B5 } from "./B5";

// Versión estática para el navbar - sin animaciones internas
const SvgLetter = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[40px] sm:h-[40px] md:h-[40px] lg:h-[64px]">
    {children}
  </div>
);

export const TitleBauveCvFast = () => {
  const letters = [
    { id: "B1", Component: B1 },
    { id: "B2", Component: B2 },
    { id: "B3", Component: B3 },
    { id: "B4", Component: B4 },
    { id: "B5", Component: B5 },
  ];

  return (
    <div className="flex items-end justify-start gap-[1px] flex-wrap">
      {letters.map(({ id, Component }) => (
        <SvgLetter key={id}>
          <Component className="w-auto h-full" />
        </SvgLetter>
      ))}
    </div>
  );
};
