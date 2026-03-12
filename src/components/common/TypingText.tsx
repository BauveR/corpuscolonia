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
      if (React.isValidElement(node) && typeof (node.props as { children?: ReactNode }).children !== "undefined") {
        return extractText((node.props as { children?: ReactNode }).children);
      }
      return "";
    };
    setTextContent(extractText(children));
  }, [children]);

  // Split into words preserving spaces, calculate global char index per character
  const totalChars = textContent.length;

  const characterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / Math.max(totalChars, 1)),
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  // Build word groups so wrapping only happens at word boundaries
  const words = textContent.split(" ");
  let globalCharIndex = 0;

  return (
    <Component
      className={cn("block break-words", className)}
      aria-label={textContent}
      role="text"
    >
      {words.map((word, wordIdx) => {
        const wordStartIndex = globalCharIndex;
        globalCharIndex += word.length + (wordIdx < words.length - 1 ? 1 : 0);

        return (
          <React.Fragment key={wordIdx}>
            {/* Word as an unbreakable inline unit */}
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className="inline-block"
                  variants={characterVariants}
                  custom={wordStartIndex + charIdx}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* Space between words — allows line break here */}
            {wordIdx < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </Component>
  );
};

export default TypingText;
