import { motion } from "framer-motion";
import { B1 } from "./B1";
import { B2 } from "./B2";
import { B3 } from "./B3";
import { B4 } from "./B4";
import { B5 } from "./B5";

const SvgLetter = ({ delay, children }: { delay: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="h-[40px] sm:h-[40px] md:h-[40px] lg:h-[64px]"
    >
    {children}
  </motion.div>
);

export const TitleBauveCv = () => {
  const letters = [
    { id: "B1", delay: 0, Component: B1 },
    { id: "B2", delay: 0.2, Component: B2 },
    { id: "B3", delay: 0.4, Component: B3 },
    { id: "B4", delay: 0.6, Component: B4 },
    { id: "B5", delay: 0.8, Component: B5 },
  ];

  return (
    <div className="flex items-end justify-start gap-[1px] flex-wrap">
      {letters.map(({ id, delay, Component }) => (
        <SvgLetter key={id} delay={delay}>
          <Component className="w-auto h-full"
          />
        </SvgLetter>
      ))}
    </div>
  );
};
