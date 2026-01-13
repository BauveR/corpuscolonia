import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./ui/motion";
import { contactItems } from "./data/cvData";
import { GlassButton } from "../buttons/Button";

type Props = { email: string; phone: string; linkedin: string; github: string; web: string; };

export function Contact({ email, phone, linkedin, github, web }: Props) {
  const items = contactItems(email, phone, linkedin, github, web);

  return (
    <motion.div
      className="ms-0 flex flex-col gap-2 mt-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Primera fila: LinkedIn, GitHub, Web */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-2">
        {items.slice(0, 3).map((it, i) => (
          <motion.a
            key={i}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-full sm:w-auto"
          >
            <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-3 text-base md:text-lg px-8 py-5 md:px-11 md:py-6 rounded-3xl">
              <span className="font-semibold text-xl md:text-2xl">{it.label}</span>
              <span>{it.value}</span>
            </GlassButton>
          </motion.a>
        ))}
      </div>

      {/* Segunda fila: Teléfono, Email */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-2">
        {items.slice(3).map((it, i) => (
          <motion.a
            key={i + 3}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-full sm:w-auto"
          >
            <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-3 text-base md:text-lg px-8 py-5 md:px-11 md:py-6 rounded-3xl">
              <span className="font-semibold text-xl md:text-2xl">{it.label}</span>
              <span>{it.value}</span>
            </GlassButton>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
