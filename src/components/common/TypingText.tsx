import { motion, Variants } from "framer-motion";
import React, { ElementType, ReactNode, useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export interface TypingTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  loop?: boolean;
}

export const TypingText = ({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 2,
}: TypingTextProps) => {
  const [textContent, setTextContent] = useState<string>("");

  useEffect(() => {
    const extractText = (node: ReactNode): string => {
      if (typeof node === "string" || typeof node === "number") {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (React.isValidElement(node) && typeof node.props.children !== "undefined") {
        return extractText(node.props.children);
      }
      return "";
    };
    setTextContent(extractText(children));
  }, [children]);

  const characters = textContent.split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  const characterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / Math.max(characters.length, 1)),
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <Component className={cn("inline-flex flex-wrap", className)}>
      <motion.span
        className="inline-block"
        initial="hidden"
        animate="visible"
        aria-label={textContent}
        role="text"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            variants={characterVariants}
            custom={index}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
};

export default TypingText;
