import { motion } from "framer-motion";
import { L1 } from './L1';
import { L2 } from './L2';
import { L3 } from './L3';
import { L4 } from './L4';
import { L5 } from './L5';
import { L6 } from './L6';
import { L7 } from './L7';

const SvgLetter = ({ delay, children }: { delay: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="h-28 sm:h-40 md:h-52 lg:h-60"
  >
    {children}
  </motion.div>
);

export const TitleMov = () => {
    const letters = [
        { id: "L1", delay: 0.2, Component: L1 },
        { id: "L2", delay: 0.5, Component: L2 },
        { id: "L3", delay: 0.7, Component: L3 },
        { id: "L4", delay: 0.9, Component: L4 },
        { id: "L5", delay: 0.7, Component: L5 },
        { id: "L6", delay: 0.5, Component: L6 },
        { id: "L7", delay: 0.2, Component: L7 },
      ];

  return (
    <div className="flex items-end justify-center gap-0.5 sm:gap-[1px] max-w-[95vw]">
      {letters.map(({ id, delay, Component }) => (
        <SvgLetter key={id} delay={delay}>
          <Component className="w-full h-full" />
        </SvgLetter>
      ))}
    </div>
  );
};
