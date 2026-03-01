import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export interface GlowingCardsProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  enableGlow?: boolean;
  glowRadius?: number;
  glowOpacity?: number;
  animationDuration?: number;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className,
  glowColor = "#f59e0b",
  style,
  ...props
}) => {
  return (
    <div
      className={cn("relative", className)}
      style={{ "--glow-color": glowColor, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
};

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className,
  containerClassName,
  enableGlow = true,
  glowRadius = 25,
  glowOpacity = 1,
  animationDuration = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay || !enableGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      overlay.style.setProperty("--x", e.clientX - rect.left + "px");
      overlay.style.setProperty("--y", e.clientY - rect.top + "px");
      overlay.style.setProperty("--opacity", glowOpacity.toString());
      setShowOverlay(true);
    };

    const handleMouseLeave = () => {
      overlay.style.setProperty("--opacity", "0");
      setShowOverlay(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableGlow, glowOpacity]);

  const maskValue = `radial-gradient(${glowRadius}rem ${glowRadius}rem at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)`;

  return (
    <div className={cn("relative w-full", className)}>
      <div ref={containerRef} className="relative">
        <div className={cn("flex gap-4 flex-wrap justify-center", containerClassName)}>
          {children}
        </div>

        {enableGlow && (
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              WebkitMask: maskValue,
              mask: maskValue,
              opacity: showOverlay ? "var(--opacity)" : "0",
              transition: `opacity ${animationDuration}ms ease-out`,
            }}
          >
            <div className={cn("flex gap-4 flex-wrap justify-center", containerClassName)}>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === GlowingCard) {
                  const glowColor = (child.props as GlowingCardProps).glowColor ?? "#f59e0b";
                  return React.cloneElement(child as React.ReactElement<GlowingCardProps>, {
                    style: {
                      ...(child.props as GlowingCardProps).style,
                      backgroundColor: glowColor + "35",
                      borderColor: glowColor,
                      boxShadow: "0 0 0 1px inset " + glowColor + ", 0 0 40px 6px " + glowColor + "55",
                    },
                  });
                }
                return child;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlowingCards;
