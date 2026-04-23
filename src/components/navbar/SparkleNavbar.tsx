import React from "react";

interface SparkleNavItem {
  label: string;
  key: string;
}

interface SparkleNavbarProps {
  items: SparkleNavItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  color?: string;
}

const SparkleNavbar: React.FC<SparkleNavbarProps> = ({
  items,
  activeIndex,
  onItemClick,
  color = "#ffffff",
}) => {
  return (
    <nav className="flex items-center gap-8">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={item.key}
            onClick={() => onItemClick(index)}
            className="relative tracking-wide text-sm transition-all duration-300 pb-1 whitespace-nowrap"
            style={{
              color: isActive ? "#ffffff" : "rgb(214 211 209)",
              fontWeight: isActive ? 600 : 400,
              textShadow: isActive
                ? `0 0 12px ${color}99, 0 0 24px ${color}55`
                : "none",
            }}
          >
            {item.label}
            <span
              className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
              style={{
                width: isActive ? "100%" : "0%",
                backgroundColor: color,
                boxShadow: isActive ? `0 0 6px ${color}88` : "none",
                opacity: isActive ? 1 : 0,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SparkleNavbar;
