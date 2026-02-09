import { motion } from "framer-motion";
import type { TeamMember } from "./data";

type Props = {
  member: TeamMember;
  index?: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function TeamMemberCard({ member, index = 0 }: Props) {
  return (
    <motion.article
      className={[
        "flex flex-col items-center text-center p-6",
        "bg-slate-900/30 backdrop-blur-2xl",
        "shadow-xl shadow-black/20",
        "border border-white/10",
        "ring-1 ring-white/5",
        "hover:bg-slate-900/40 hover:border-white/15",
        "transition-all duration-500",
        "rounded-3xl",
        "text-stone-300",
      ].join(" ")}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/10">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <h3 className="mt-4 text-base md:text-lg font-medium text-stone-100 tracking-wide">
        {member.name}
      </h3>

      <p className="mt-1 text-sm text-stone-400">{member.role}</p>

      {member.link && (
        <a
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-orange-300 hover:text-orange-200 transition-colors duration-300"
        >
          Ver perfil
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      )}
    </motion.article>
  );
}
