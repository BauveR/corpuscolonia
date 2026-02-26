import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { Welcome } from "../welcome/Welcome";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function WelcomeSection({ sectionRef }: Props) {
  return (
    <AnimatedSection
      id="welcome"
      ref={sectionRef}
      viewportAmount={0.45}
      className="!h-[100svh] !min-h-[100svh] overflow-hidden"
      initial={{ opacity: 1, y: 0 }}
    >
      <Welcome />
    </AnimatedSection>
  );
}
