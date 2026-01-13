import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiVite, SiNodedotjs, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign,
  SiWordpress, SiApple, SiOpenai
} from "react-icons/si";
import type { JSX } from "react";

// Icon mapping for skills - separated from UI logic (Open/Closed Principle)
export const skillIconMap: Record<string, JSX.Element> = {
  "Photoshop CC": <SiAdobephotoshop className="text-blue-500 w-5 h-5" />,
  "Illustrator CC": <SiAdobeillustrator className="text-orange-500 w-5 h-5" />,
  "Final Cut": <SiApple className="text-gray-400 w-5 h-5" />,
  "InDesign CC": <SiAdobeindesign className="text-pink-600 w-5 h-5" />,
  "Wix y Wordpress": <SiWordpress className="text-blue-700 w-5 h-5" />,
  "Midjourney AI": <SiOpenai className="text-indigo-500 w-5 h-5" />,
  HTML: <SiHtml5 className="text-orange-500 w-5 h-5" />,
  CSS: <SiCss3 className="text-blue-500 w-5 h-5" />,
  JavaScript: <SiJavascript className="text-yellow-400 w-5 h-5" />,
  TypeScript: <SiTypescript className="text-blue-600 w-5 h-5" />,
  React: <SiReact className="text-cyan-400 w-5 h-5" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400 w-5 h-5" />,
  Vite: <SiVite className="text-purple-400 w-5 h-5" />,
  "Node.js": <SiNodedotjs className="text-green-600 w-5 h-5" />,
};
