import { L1 } from './L1';
import { L2 } from './L2';
import { L3 } from './L3';
import { L4 } from './L4';
import { L5 } from './L5';
import { L6 } from './L6';
import { L7 } from './L7';

// Versión estática para el navbar - sin animaciones internas
const SvgLetter = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[40px] sm:h-[40px] md:h-[40px] lg:h-[69px]">
    {children}
  </div>
);

export const TitleMovCvFast = () => {
  const letters = [
    { id: "L1", Component: L1 },
    { id: "L2", Component: L2 },
    { id: "L3", Component: L3 },
    { id: "L4", Component: L4 },
    { id: "L5", Component: L5 },
    { id: "L6", Component: L6 },
    { id: "L7", Component: L7 },
  ];

  return (
    <div className="flex items-end justify-start gap-[1px]">
      {letters.map(({ id, Component }) => (
        <SvgLetter key={id}>
          <Component className="w-full h-full" />
        </SvgLetter>
      ))}
    </div>
  );
};
