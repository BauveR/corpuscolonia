import { motion, type Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  viewportAmount?: number; // ajuste fino del disparo
};

export default function GlassPanel({
  children,
  className = "",
  variants,
  viewportAmount = 0.35,
}: Props) {
  return (
    <motion.div
      className={[
        // 👇 tu estilo intacto
        "rounded-[3rem] p-4 sm:p-8 mt-3",
        "bg-slate-900/70",
        "backdrop-blur-xl",
        "shadow-lg",
        "border border-white/20",
        "ring-1 ring-white/10",
        "hover:bg-slate-900/80",
        "transition-colors duration-500",
        "max-w-full overflow-x-hidden",
        className,
      ].join(" ")}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}
