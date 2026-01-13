import { BackgroundBlobsLight } from "../background/BackgroundBlobsLight";
import { LeftColumn } from "./layout/LeftColumn";
import { RightColumn } from "./layout/RightColumn";

export const MainContent = () => {
  return (
    <section className="relative isolate w-full min-h-[100svh] overflow-x-hidden bg-transparent">
      {/* separador por el menú fijo del App */}
      <div className="h-4 md:h-0" />

      {/* blobs absolute */}
      <BackgroundBlobsLight />

      {/* Contenido a pantalla completa */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 pb-12 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 sm:gap-6 lg:gap-10 lg:items-start max-w-full">
          <LeftColumn />
          <RightColumn />
        </div>
      </div>
    </section>
  );
};
